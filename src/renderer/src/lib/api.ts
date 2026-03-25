export const getConfig = async () : Promise<ConfigType> => {
    return await window.api.m8m.getData()
}

export const setConfig = async (data: { dpi_mode: number; led_mode: number }) : Promise<unknown> => {
    return await window.api.m8m.setData(data)
}