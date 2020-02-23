$(document).ready(function() {
  'use strict';

  Chart.defaults.global.defaultFontColor = '#75787c';


const avg=document.getElementById("avgRnd")
const streak=document.getElementById("avgStreak")
const standingTym=document.getElementById("standingTym")
const username = document.getElementById("username")
const userEmail = document.getElementById("userEmail")
const userData = JSON.parse(localStorage.getItem("userData"))
const user=userData.user




        const jay=async()=>{
          //const pajji= document.getElementById("inlineFormInput")
          const formdata=new FormData()
          
          
        const names=user.name
          formdata.append("name",names)
          try{
              const fetchData=await fetch("http://127.0.0.1:5000/player_data",{
      method:'POST',
      body:formdata
      })
      const data=await fetchData.json()
      console.log(data)
      graph(data)
          }
          catch(err){
              console.log(err)
          }
          }
  
          jay()

  

  // ------------------------------------------------------- //
  // Bar Chart
  // ------------------------------------------------------ //
  
 function graph(PlayerData){
  avg.innerHTML=PlayerData.average_rounds
  streak.innerHTML=PlayerData.Average_streak
  standingTym.innerHTML=PlayerData.Height
  console.log(userData.user.name)


  var BARCHARTEXMPLE = $('#barChartExample1');
  var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: 'bar',
    options: {
      title: {
        display: true,
        text: 'Ground Head Strike',
        fontSize: 20
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ]
      }
    },
    data: {
      labels: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'],
      datasets: [
        {
          label: 'Landed',
          backgroundColor: [
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)'
          ],
          hoverBackgroundColor: [
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)'
          ],
          borderColor: [
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)'
          ],
          borderWidth: 1,
          data:PlayerData.ground_head_strikes[1].map(x=>x*4)
        },
        {
          label: 'Attempted',
          backgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderWidth: 1,
          data: PlayerData.ground_head_strikes[0].map(x=>x*4)
        }
      ]
    }
  });

  var BARCHARTEXMPLE = $('#barChartExample3');
  var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: 'bar',
    options: {
      title: {
        display: true,
        text: 'Significant Kick',
        fontSize: 20
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ]
      }
    },
    data: {
      labels: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'],
      datasets: [
        {
          label: 'Landed',
          backgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderWidth: 1,
          data: PlayerData.significant_kick[1]
        },
        {
          label: 'Attempted',
          backgroundColor: [
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)'
          ],
          borderColor: [
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)'
          ],
          borderWidth: 1,
          data:PlayerData.significant_kick[0]
        }
      ]
    }
  });

  var BARCHARTEXMPLE = $('#barChartExample4');
  var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: 'bar',
    options: {
      title: {
        display: true,
        text: 'Significant Punches',
        fontSize: 20
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ]
      }
    },
    data: {
      labels: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'],
      datasets: [
        {
          label: 'Landed',
          backgroundColor: [
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)'
          ],
          hoverBackgroundColor: [
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)'
          ],
          borderColor: [
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)'
          ],
          borderWidth: 1,
          data:PlayerData.significant_punches[1]
        },
        {
          label: 'Attempted',
          backgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderWidth: 1,
          data: PlayerData.significant_punches[0]
        }
      ]
    }
  });

  var BARCHARTEXMPLE = $('#barChartExample6');
  var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: 'bar',
    options: {
      title: {
        display: true,
        text: 'Head Punches',
        fontSize: 20
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ]
      }
    },
    data: {
      labels: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'],
      datasets: [
        {
          label: 'Landed',
          backgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderWidth: 1,
          data: PlayerData.head_punches[1]
        },
        {
          label: 'Attempted',
          backgroundColor: [
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)'
          ],
          borderColor: [
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)'
          ],
          borderWidth: 1,
          data:  PlayerData.head_punches[0]
        }
      ]
    }
  });

  var BARCHARTEXMPLE = $('#barChartExample5');
  var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: 'bar',
    options: {
      title: {
        display: true,
        text: 'Head kicks',
        fontSize: 20
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ]
      }
    },
    data: {
      labels: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'],
      datasets: [
        {
          label: 'Landed',
          backgroundColor: [
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)'
          ],
          hoverBackgroundColor: [
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)',
            'rgba(134, 77, 217, 0.57)'
          ],
          borderColor: [
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)',
            'rgba(134, 77, 217, 1)'
          ],
          borderWidth: 1,
          data: PlayerData.head_kicks[1]
        },
        {
          label: 'Attempted',
          backgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderWidth: 1,
          data:  PlayerData.head_kicks[0]
        }
      ]
    }
  });

 
  // ------------------------------------------------------- //
  // Bar Chart
  // ------------------------------------------------------ //
  var BARCHARTEXMPLE = $('#barChartExample2');
  var barChartExample = new Chart(BARCHARTEXMPLE, {
    type: 'bar',
    options: {
      title: {
        display: true,
        text: 'Body Strike',
        fontSize: 20
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              color: '#eee'
            }
          }
        ]
      }
    },
    data: {
      labels: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'],
      datasets: [
        {
          label: 'Landed',
          backgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderColor: [
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)',
            'rgba(75, 75, 75, 0.7)'
          ],
          borderWidth: 1,
          data: PlayerData.body_strike[1]
        },
        {
          label: 'Attempted',
          backgroundColor: [
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)',
            'rgba(238, 139, 152, 0.7)'
          ],
          borderColor: [
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)',
            'rgba(238, 139, 152, 1)'
          ],
          borderWidth: 1,
          data: PlayerData.body_strike[0]
        }
      ]
    }
  });

  
  // ------------------------------------------------------- //
  // Sales Bar Chart 1
  // ------------------------------------------------------ //
  var BARCHART1 = $('#salesBarChart1');
  var barChartHome = new Chart(BARCHART1, {
    type: 'bar',
    options: {
      scales: {
        xAxes: [
          {
            display: false,
            barPercentage: 0.2
          }
        ],
        yAxes: [
          {
            display: false
          }
        ]
      },
      legend: {
        display: false
      }
    },
    data: {
      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      datasets: [
        {
          label: 'Data Set 1',
          backgroundColor: [
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99'
          ],
          borderColor: [
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99',
            '#EF8C99'
          ],
          borderWidth: 0.2,
          data: [35, 55, 65, 85, 40, 30, 18, 35, 20, 70]
        }
      ]
    }
  });

  // ------------------------------------------------------- //
  // Sales Bar Chart 21
  // ------------------------------------------------------ //
  var BARCHART1 = $('#salesBarChart2');
  var barChartHome = new Chart(BARCHART1, {
    type: 'bar',
    options: {
      scales: {
        xAxes: [
          {
            display: false,
            barPercentage: 0.2
          }
        ],
        yAxes: [
          {
            display: false
          }
        ]
      },
      legend: {
        display: false
      }
    },
    data: {
      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      datasets: [
        {
          label: 'Data Set 1',
          backgroundColor: [
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9'
          ],
          borderColor: [
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9',
            '#CF53F9'
          ],
          borderWidth: 0.2,
          data: [44, 75, 65, 34, 60, 45, 22, 35, 30, 63]
        }
      ]
    }
  });

  // ------------------------------------------------------- //
  // Pie Chart
  // ------------------------------------------------------ //
  var PIECHARTEXMPLE = $('#visitPieChart');
  var pieChartExample = new Chart(PIECHARTEXMPLE, {
    type: 'pie',
    options: {
      legend: {
        display: false
      }
    },
    data: {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [300, 50, 100, 80],
          borderWidth: 0,
          backgroundColor: ['#723ac3', '#864DD9', '#9762e6', '#a678eb'],
          hoverBackgroundColor: ['#723ac3', '#864DD9', '#9762e6', '#a678eb']
        }
      ]
    }
  });

  var pieChartExample = {
    responsive: true
  };


 }
});
