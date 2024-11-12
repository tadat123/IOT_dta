import moment from "moment/moment";

// export const cardsData = [
//   {
//     title: "Temperature",
//     amount: 20,
//     unit: "°C",
//   },
//   {
//     title: "Humidity",
//     amount: 60,
//     unit: "%",
//   },
//   {
//     title: "Light",
//     amount: 100,
//     unit: "lx",
//   },
// ];

export const ordersData = [
  {
    name: "led",
    isOn: false,
  },
  {
    name: "laptop",
    isOn: false,
  },
  {
    name: "fan",
    isOn: false,
  }
]


//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};


// * user table data
export const userData = [
  {
    name: {
      firstName: '26',
      lastName: '60',
    },
    address: '320',
    city: '1134',
    state: '19.8',
    time: '12:30:45 01/01/2023',
  },
  {
    name: {
      firstName: '30',
      lastName: '56',
    },
    address: '150',
    city: '1050',
    state: '18.9',
    time: '14:15:30 02/01/2023',
  },
  {
    name: {
      firstName: '31',
      lastName: '58',
    },
    address: '400',
    city: '1111',
    state: '17.8',
    time: '16:45:15 03/01/2023',
  },
  {
    name: {
      firstName: '25',
      lastName: '63',
    },
    address: '220',
    city: '1234',
    state: '16.7',
    time: '18:00:00 04/01/2023',
  },
  {
    name: {
      firstName: '28',
      lastName: '62',
    },
    address: '250',
    city: '1034',
    state: '17.9',
    time: '20:30:45 05/01/2023',
  },
  {
    name: {
      firstName: '32',
      lastName: '61',
    },
    address: '300',
    city: '1000',
    state: '21.4',
    time: '22:15:30 06/01/2023',
  },
  {
    name: {
      firstName: '31',
      lastName: '57',
    },
    address: '180',
    city: '1100',
    state: '19.3',
    time: '23:45:15 07/01/2023',
  },
  {
    name: {
      firstName: '29',
      lastName: '55',
    },
    address: '240',
    city: '1200',
    state: '18.6',
    time: '01:00:00 08/01/2023',
  },
    {
    name: {
      firstName: '26',
      lastName: '60',
    },
    address: '225',
    city: '1150',
    state: '20.7',
    time: '02:30:45 09/01/2023',
  },
];