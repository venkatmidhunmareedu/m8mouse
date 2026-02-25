/*  
Known modes
  DPI modes        [1, 2, 3, 4, 5, 6]
  DPI resolution   [1 (500), 2 (800), 3 (1000), 4 (1200), 5 (1600), 
                    6 (2000), 7 (2400), 8 (3200), 9 (4000), 
                    10 (4800), 11 (6400), 12 (8000)]
  LED modes        [1 (DPI), 2 (Multicolour), 3 (Rainbow), 4 (Flow), 
                    5 (Waltz), 6 (Four Seasons), 7 (Off)]
  LED speeds       [1, 2, 3, 4, 5, 6, 7, 8]

*/

export const DPI_MODES = {
  '500': 1,
  '1200': 2,
  '2000': 3,
  '2400': 4,
  '4000': 5,
  '4800': 6
}

export const LED_MODES = {
  DPI: 1,
  Multicolour: 2,
  Rainbow: 3,
  Flow: 4,
  Waltz: 5,
  'Four Seasons': 6,
  Off: 7
}

export const LED_SPEEDS = [1, 2, 3, 4, 5, 6, 7, 8]
