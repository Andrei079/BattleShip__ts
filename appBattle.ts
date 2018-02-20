
document.addEventListener("DOMContentLoaded", function () {

    const battlefield = document.querySelectorAll("td");
    var fieldNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 23, 34, 45, 56, 67, 78, 89, 100, 111];
    var coordinateY = [0, "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
    var shipsArr = [];
    var display: HTMLElement = document.querySelector(".display");

    function Ship(mrare, mcoordinate) {
        this.rare = mrare;
        this.coordinate = mcoordinate;
        this.fireCoord = [];

    }

    Ship.prototype.paint = function () {
        for (let i = 0; i < (Number(this.rare) - 1);) {
            //вычияляем ячейку         
            var j = this.coordinate[i];
            var battlefield = document.querySelectorAll("td");
            battlefield[(j - 1)].style.backgroundColor = "green";
            i = i + 1;
        }
    };

    Ship.prototype.paintDel = function () {
        for (let i = 0; i < (Number(this.rare) - 1);) {
            //вычияляем ячейку
            /*   var j=object.coordinateX[i]+10*(object.coordinateY[i]-1); */
            var j = this.coordinate[i];
            battlefield[(j - 1)].style.backgroundColor = "black";
            i = i + 1;


        }

    };

    Ship.prototype.paintNo = function () {
        var arr = this.coordinate.sort();
        var x = arr[0];
        var y = arr[(arr.length - 1)];
        var arrField = [(x - 1), (x - 12), (x + 10), (y + 1), (y + 12), (y - 10)];
        console.log(arrField);
        for (let i = 0; i < arr.length; i++) {
            fieldNo.push(arr[i]);
            fieldNo.push((arr[i] + 11));
            fieldNo.push((arr[i] - 11));

        }

        fieldNo = fieldNo.concat(arrField);
    };





    let ship2 = new Ship(3, [14, 13]);
    let ship3 = new Ship(4, [51, 52, 53]);
    console.log(fieldNo);
    /*  shipsArr.push(ship); */

    ship3.paintNo();
    console.log(fieldNo);
    shipsArr.push(ship2);
    shipsArr.push(ship3);


    /*    ship1.paint(); */
    ship2.paint();
    ship3.paint();


    // выстрел
    function Fire(object, x) {
        // сравнение масивов вспомогательная функция
        function _Compare(arr1, arr2) {
            var arrX = arr1.sort();
            var arrY = arr2.sort();
            if (arrX.join("") == arrY.join("")) {
                return true;
            }
            else {
                return false;
            }
        }

        var trueX = false;
        for (let j = 0; j < object.length; j++) {
            // проверка координат           
            console.log(object);
            var i = 0;
            while ((i < object[j].coordinate.length) && (object[j].coordinate[i] != x)) {
                i = i + 1;
            }

            // попал или мимо
            if (object[j].coordinate[i] == x) {

                display.innerHTML = "Попал!";
                display.style.display = "block";
                object[j].fireCoord.push(x);
                battlefield[(x - 1)].style.backgroundColor = "red";
                /* добавление отстрелянных координат */
                var compareX = _Compare(object[j].coordinate, object[j].fireCoord);
                console.log(compareX);
                trueX = true;
                if (compareX == true) {

                    display.innerHTML = "Убил!!!";
                    display.style.display = "block";
                    object[j].paintDel();
                    /*    shipsArr.splice(j,j) ; */
                    /*   object.life=false; */
                    console.log(object);
                }
            }
        }
        if (trueX == false) {

            display.innerHTML = "Мимо!";
            display.style.display = "block";

        }

    };

    //выделение
    /*   var fieldactive=document.querySelectorAll('.field');
      console.log(fieldactive);
          fieldactive.addEventListener("click", function () {
             fieldactive.style.backgroundColor="green";  
          }); */



    var btnFire = document.querySelector("#btn");
    btnFire.addEventListener("click", function () {
        var coord: string = document.querySelector("#coord").textContent;
        // приведение к координатам
        var strArray = coord.split("");
        var coordX = strArray[1];
        var coordY = strArray[0];
        // вычисление буквеной корд и общихкоординаты
        var i = 0;
        while (coordY != coordinateY[i]) {
            i = i + 1;
        }
        let coordD = i * 11 + Number(coordX) + 1;
        Fire(shipsArr, coordD);

        /* if (coordX > 10 || coordX <= 0 || coordY > 10 || coordX <= 0) {
            alert("ERROR");return false  ;                      
        } */

    });


    //end
});


