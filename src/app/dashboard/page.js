'use client'
import React,{useState, useEffect} from 'react';
import Overview from './components/Overvie';
import TopSales from './components/TopSales';
import LineChart from './components/LineChart';
import axios from 'axios';

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [breadData, setBreadData] = useState({
      label: "Bread",
      data: [],
      backgroundColor: "#00FF00",
      borderColor: "#00FF00",
      borderWidth: 1,
  });
  const [softDrinksData, setSoftDrinksData] = useState({
    label: "Soft Drinks",
    data: [],
    backgroundColor: "rgba(75,192,192,0.2)",
    borderColor: "rgba(75,192,192,1)",
    borderWidth: 1,
});

const [snacksData, setSnacksData] = useState({
    label: "Snacks",
    data: [],
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
});
  useEffect(() => {
      const fetchData = async () => {
        const  brd = {
          "product_id": 1
      }
      const sft = {
        "product_id": 2
    }
      const snks = {
        "product_id": 3
    }
      
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/predict/`, brd);
          const data = await response.data;
          console.log("pred", data)

          setBreadData(prevState => ({
              ...prevState,
              data: data.predictions.map(item => item.prediction)
          }));
          const responseSoftDrinks = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/predict/`, sft);
          const dataSoftDrinks = responseSoftDrinks.data;

          setSoftDrinksData(prevState => ({
              ...prevState,
              data: dataSoftDrinks.predictions.map(item => item.prediction)
          }));

          const responseSnacks = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/predict/`, snks);
          const dataSnacks = responseSnacks.data;

          setSnacksData(prevState => ({
              ...prevState,
              data: dataSnacks.predictions.map(item => item.prediction)
          }));



        //   setChartData(prevState => ({
        //     ...prevState,
        //     datasets: [...prevState.datasets, {
        //         ...breadData,
        //         data: data.predictions.map(item => item.prediction)
        //     }]
        // }));


      };

      fetchData();
  }, []);

  useEffect(() => {
    setChartData(prevState => ({
        ...prevState,
        datasets: [
            ...prevState.datasets,
            breadData,
            softDrinksData,
            snacksData
        ]
    }));
}, [breadData, softDrinksData, snacksData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
      const fetchData = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
          const data = response.data
          console.log(data)
          setTotalProducts(data.length);
          setCategories(new Set(data.map(item => item.category)).size);
          setInStock(data.reduce((total, item) => total + item.items_remaining, 0));
          setOutOfStock(data.filter(item => item.items_remaining === 0).length);
          setSalesData(data.map(item => ({ name: item.name, sales: item.items_sold })));
      };

      fetchData();
  }, []);
    const [chartData, setChartData] = useState({
        labels: ["mon", "tue", "wed", "thur", "friday","sat","sun"],
        datasets: [

        ]
      });
    
      const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
        plugins: {
          legend: {
            display: true, // Ensures the legend is shown
            position: 'top', // Positions the legend at the top of the chart
            labels: {
              color: 'black', // Sets the color of the labels
              font: {
                size: 16, // Sets the font size of the labels
              },
            },
          },
        },
      };

    // const salesData = [
    //     { name: 'Pepsi', sales: 400 },
    //     { name: 'Bread', sales: 300 },
    //     { name: 'Lemon creams', sales: 210 },
    //     { name: 'Hellos', sales: 100 },
    //     { name: 'Go slo', sales: 90 },
    //     { name: 'Coca cola', sales: 10 },
    //   ];
  return (
    <div >
        <Overview totalProducts={totalProducts} categories={categories}  inStock={inStock} outOfStock={outOfStock} />
        <div className="flex w-full flex-col space-y-5 my-10 md:space-y-0 md:flex-row md:space-x-5 md:justify-between">
            <div className='w-full h-max bg-white p-2 rounded-xl md:w-3/5'>
            <LineChart chartData={chartData} options={options} />
            </div>
            <div className='w-full bg-white rounded-xl md:w-3/5'>
            <TopSales salesData={salesData} className="w-full"/>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;