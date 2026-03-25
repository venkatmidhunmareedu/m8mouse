// SPDX-License-Identifier: MIT

#include <stdint.h>
#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
//#include <hidapi/hidapi.h>
//#include <unistd.h>

#include "m8mouse.h"
//#define DEBUG_ONLY



enum{
    RUN_ACTION_LIST,
    RUN_ACTION_GET,
    RUN_ACTION_SET,
    RUN_ACTION_USAGE,
    RUN_ACTION_UNKNOWN
};

int cli_debug_level = LOG_FATAL;
bool cli_json_output = false;

int cli_requested_dpi = -1;
int cli_requested_led = -1;
int cli_requested_speed = -1;



const char* strip_label(const char* label) {
    static char buffer[128];
    const char* start = strchr(label, '(');
    if (start) {
        start++;
        const char* end = strchr(start, ')');
        if (end) {
            size_t len = end - start;
            if (len < sizeof(buffer)) {
                strncpy(buffer, start, len);
                buffer[len] = '\0';
                return buffer;
            }
        }
    }
    return label;
}

void print_device_state_json(){
    printf("{\n");
    
    // Get active DPI slot index (0-5)
    mode *dpi_slot = device_get_active_mode(M8_DEVICE_MODE_DPI);
    int active_slot_idx = -1;
    if (dpi_slot) {
        // Since labels are "1", "2", etc., we can find the index
        active_slot_idx = atoi(dpi_slot->label) - 1;
    }

    // Get the resolution for that active slot
    mode *dpi_mode = NULL;
    if (active_slot_idx >= 0 && active_slot_idx < M8_DPI_RES_COUNT) {
        dpi_mode = device_get_mode_value(M8_DEVICE_MODE_DPI_RES, active_slot_idx);
    }

    printf("  \"dpi_mode\": \"%s\",\n", dpi_mode ? strip_label(dpi_mode->label) : "unknown");
    
    printf("  \"dpi_resolution\": [\n");
    for(int i=0; i<M8_DPI_RES_COUNT; i++){
        mode *dpires_mode = device_get_mode_value(M8_DEVICE_MODE_DPI_RES, i);
        printf("    \"%s\"", dpires_mode ? strip_label(dpires_mode->label) : "N/A");
        if(i < M8_DPI_RES_COUNT - 1) printf(",");
        printf("\n");
    }
    printf("  ],\n");
    
    mode *led_mode = device_get_active_mode(M8_DEVICE_MODE_LED);
    printf("  \"led_mode\": \"%s\",\n", led_mode ? strip_label(led_mode->label) : "unknown");
    
    mode *speed_mode = device_get_active_mode(M8_DEVICE_MODE_SPEED);
    printf("  \"led_speed\": \"%s\"\n", speed_mode ? speed_mode->label : "unknown");
    
    printf("}\n");
}

void print_device_state(){
    if(cli_json_output){
        print_device_state_json();
        return;
    }
    //log_trace("print_device_state: Printing device state");

    mode *dpi_mode = device_get_active_mode(M8_DEVICE_MODE_DPI);
    if(dpi_mode)
        printf("  %-15s: %s\n", "DPI Mode", dpi_mode->label);
    else
        printf("  DPI Mode is unknown\n");

    printf("  %-15s: ", "DPI Resolution");
    for(int i=0; i<M8_DPI_RES_COUNT; i++){
        mode *dpires_mode = device_get_mode_value(M8_DEVICE_MODE_DPI_RES, i);
        if(dpires_mode)
            printf("DPI %i [%s]", i+1, dpires_mode->label);
        else
            printf("  N/A");
        if(i < (M8_DPI_RES_COUNT - 1))
            printf(", ");
        //print a new line halfway through
        if(i == M8_DPI_RES_COUNT / 2 - 1){
            printf("\n%19s", " ");
        }
    }
    printf("\n");

    mode *led_mode = device_get_active_mode(M8_DEVICE_MODE_LED);
    //int ledindex = m8device.led_mode;
    if(led_mode)
        printf("  %-15s: %s\n", "LED Mode", led_mode->label);
    else
        printf("  LED Mode is unknown\n");

    mode *speed_mode = device_get_active_mode(M8_DEVICE_MODE_SPEED);
    //int speedindex = m8device.led_speed;
    if(speed_mode)
        printf("  %-15s: %s\n", "LED Speed", speed_mode->label);
    else
        printf("  LED Speed is unknown\n");

}

void print_single_mode(char *label, mode* curr){
    
    char buffer[512];
    char *pointer = buffer;
    int line = 0, letter = 0, width = 64;

    pointer = buffer;
    pointer += sprintf(pointer, "  %-16s [", label);
    for(int i = 1; curr->label; i++, curr++){
        //print a new line if it gets too long
        letter = pointer - buffer;
        if((letter / width) > line){
            pointer += sprintf(pointer, "\n%20s", " ");
            line++;
        }

        pointer += sprintf(pointer, "%s, ", curr->label);
    }
    sprintf(pointer - 2, "]\n");
    printf("%s", buffer);
}

void print_modes_json(){
    printf("{\n");
    
    mode *curr;
    
    printf("  \"dpi_modes\": [");
    curr = device_get_all_modes(M8_DEVICE_MODE_DPI);
    for(int i = 0; curr->label; i++, curr++){
        if(i > 0) printf(", ");
        printf("\"%s\"", curr->label);
    }
    printf("],\n");
    
    printf("  \"dpi_resolution\": [");
    curr = device_get_all_modes(M8_DEVICE_MODE_DPI_RES);
    for(int i = 0; curr->label; i++, curr++){
        if(i > 0) printf(", ");
        printf("\"%s\"", strip_label(curr->label));
    }
    printf("],\n");
    
    printf("  \"led_modes\": [");
    curr = device_get_all_modes(M8_DEVICE_MODE_LED);
    for(int i = 0; curr->label; i++, curr++){
        if(i > 0) printf(", ");
        printf("\"%s\"", strip_label(curr->label));
    }
    printf("],\n");
    
    printf("  \"led_speeds\": [");
    curr = device_get_all_modes(M8_DEVICE_MODE_SPEED);
    for(int i = 0; curr->label; i++, curr++){
        if(i > 0) printf(", ");
        printf("\"%s\"", curr->label);
    }
    printf("]\n");
    
    printf("}\n");
}

void print_modes(){
    if(cli_json_output){
        print_modes_json();
        return;
    }
    
    printf("Known modes\n");
    
    mode *curr;

    curr = device_get_all_modes(M8_DEVICE_MODE_DPI);
    print_single_mode("DPI modes", curr);

    curr = device_get_all_modes(M8_DEVICE_MODE_DPI_RES);
    print_single_mode("DPI resolution", curr);

    curr = device_get_all_modes(M8_DEVICE_MODE_LED);
    print_single_mode("LED modes", curr);
    
    curr = device_get_all_modes(M8_DEVICE_MODE_SPEED);
    print_single_mode("LED speeds", curr);
    
}


void print_usage(){
    if(cli_json_output){
        printf("{\"error\": \"invalid arguments\", \"usage\": \"m8mouser [-j] [-l] [-dpi D] [-led L] [-speed S]\"}\n");
        return;
    }
    printf("Usage: \n"
    "    m8mouser \n"
    "    m8mouser -l \n"
    "       -j     output JSON format for Electron app integration\n"
    "    \n"
    "    Options: \n"
    "       -l     list known modes and values\n"
    "       -dpi   set DPI to this index (from known modes) \n"
    "       -led   set LED mode to this index (from known modes) \n"
    "       -speed set LED speed to this index (from known modes) \n"
    "       -g     print debug messages\n"
    "       -h     help message (this one)\n"
    "\n");
}

    
int process_args(int argc, char *argv[]){
    int arg_index = 1;
    int run_action = RUN_ACTION_GET;
    
    while(arg_index < argc){
        char *option   = argv[arg_index];
        char *argument = "";

        if(arg_index + 1 < argc){
            argument = argv[arg_index + 1];
        }

        if(!strcmp(option, "-h")){
            return RUN_ACTION_USAGE;
        }else if(!strcmp(option, "-g")){
            cli_debug_level = LOG_WARN;
        }else if(!strcmp(option, "-g1")){
            cli_debug_level = LOG_INFO;
        }else if(!strcmp(option, "-g2")){
            cli_debug_level = LOG_TRACE;
        }else if(!strcmp(option, "-j")){
            cli_json_output = true;
        }else if(!strcmp(option, "-l")){
            return RUN_ACTION_LIST;
        }else if(!strcmp(option, "-dpi")){
            if(strlen(argument) > 0)
                cli_requested_dpi = atoi(argument) - 1;
            run_action = RUN_ACTION_SET;
            arg_index++;
        }else if(!strcmp(option, "-led")){
            if(strlen(argument) > 0)
                cli_requested_led = atoi(argument) - 1;
            run_action = RUN_ACTION_SET;
            arg_index++;
        }else if(!strcmp(option, "-speed")){
            if(strlen(argument) > 0)
                cli_requested_speed = atoi(argument) - 1;
            run_action = RUN_ACTION_SET;
            arg_index++;
        }else{
            return RUN_ACTION_UNKNOWN;
        }
        arg_index++;
    }
    
    if(run_action == RUN_ACTION_SET && 
        (cli_requested_dpi == -1 && cli_requested_led == -1 && cli_requested_speed == -1))
        run_action = RUN_ACTION_UNKNOWN;
    
    return run_action;
}

int main(int argc, char *argv[]){
    
    FILE *logfile;
    
    int run_action = process_args(argc, argv);
    
    if(run_action == RUN_ACTION_LIST){
        print_modes();
        return 0;
    }else if(run_action == RUN_ACTION_USAGE || run_action == RUN_ACTION_UNKNOWN){
        print_usage();
        return 1;
    }

    //initialise logs
    log_set_level(cli_debug_level);
    if(cli_debug_level == LOG_TRACE){
        log_set_level(LOG_ERROR);
        time_t timenow = time(NULL);
        struct tm *tm_now_info = localtime(&timenow);
        char timestamp_buff[64];
        strftime(timestamp_buff, sizeof(timestamp_buff), "%Y%m%d-%H%M%S", tm_now_info);
        char filename_buff[64];
        sprintf(filename_buff, "m8debug-%s.log", timestamp_buff);
        logfile = fopen(filename_buff, "a");
        fprintf(logfile, "\n=================================\n");
        log_add_fp(logfile, LOG_TRACE);
        //log_set_quiet(1);
        log_set_level(LOG_INFO);
    }
    
        
    if(device_init()){
        if(cli_json_output){
            printf("{\"error\": \"device_init_failed\", \"message\": \"Error initialising device. May not be connected or no user permission\", \"vid\": \"%04x\", \"pid\": \"%04x\"}\n", USB_M8_VID, USB_M8_PID);
        } else {
            printf("Error initialising device. May not be connected or no user permission\n");
            printf("      - check that device %04x:%04x is connected to usb (lsusb)\n", USB_M8_VID, USB_M8_PID);
            printf("      - run with sudo or add uaccess to udev rules (see README.md)\n");
        }
        return 1;
    }
    
    if(!cli_json_output) puts("Getting device modes");
    device_query();
    //print_device_mem();
    
    // In JSON mode with SET action, skip initial state - only show final result
    if(!(cli_json_output && run_action == RUN_ACTION_SET)){
        print_device_state();
    }

    if(run_action == RUN_ACTION_SET){
        if(!device_set_modes(cli_requested_dpi, cli_requested_led, cli_requested_speed)){
            //device_update_state();
            //print_device_state();
            
        if(!cli_json_output) puts("Updating device modes");
            device_update();
            //verify by querying again
            if(!cli_json_output) puts("Refreshing device modes");
            device_query();
            print_device_state();
        }
    }
    
    device_shutdown();
    
    if(cli_debug_level == LOG_TRACE)
        fclose(logfile);
    return 0;
}
