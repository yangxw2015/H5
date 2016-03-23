(function () {
    var winH = document.documentElement.clientHeight;
    var outer = document.querySelector(".outer");
    var pageList = [].slice.call(document.querySelectorAll("section"), 0);
    var count = document.querySelectorAll("section").length;
    var tip = document.querySelector(".tip");
    var index = 0;
    //console.log(count);
    //console.log(outer);


    outer.style.height = count * winH + "px";
    console.log(outer.style.height);
    pageList.forEach(function (cur) {
        cur.style.height = winH + "px";
        console.log(cur.style.height);
    });

    var body = document.body;
    $t.swipeUp(body, {
        start: function (e) {
            this["isEnd"] = false;
            this["changePos"] = 0;
            this["strTop"] = parseFloat(outer.style.top);
        },
        move: function (e) {
            if (index >= (count - 1)) {
                this["isEnd"] = true;
                return;
            }
            var changePos = this["endYswipeUp"] - this["strYswipeUp"];
            this["changePos"] = changePos;
            outer.style.top = this["strTop"] + changePos + "px";
        },
        end: function (e) {
            if (this["isEnd"]) {
                return;
            }
            setTran(true);
            var changePos = this["changePos"];
            if (Math.abs(changePos) / winH >= 0.25) {
                index++;
                if(index==count){
                    index=0;
                }
                tip.style.display = index >= (count - 1) ? "none" : "block";
            }
            outer.style.top = -index * winH + "px";

            window.setTimeout(function () {
                setTran(false);
                pageList.forEach(function (cur, i) {
                    cur.className = i === index ? "move" : null
                })
            })
        }
    });

    $t.swipeDown(body, {
        start: function (e) {
            this["isEnd"] = false;
            this["changePos"] = 0;
            this["strTop"] = parseFloat(outer.style.top);
        },
        move: function (e) {
            if (index >= (count - 1)) {
                this["isEnd"] = true;
                return;
            }
            var changePos = this["endYswipeDown"] - this["strYswipeDown"];
            this["changePos"] = changePos;
            outer.style.top = this["strTop"] + changePos + "px";
        },
        end: function (e) {
            if (this["isEnd"]) {
                return;
            }
            setTran(true);
            var changePos = this["changePos"];
            if (Math.abs(changePos) / winH >= 0.25) {
                index--;
                if(index==0){
                    index=count;
                }
                tip.style.display = index >= (count - 1) ? "none" : "block";
            }
            outer.style.top = -index * winH + "px";

            window.setTimeout(function () {
                setTran(false);
                pageList.forEach(function (cur, i) {
                    cur.className = i === index ? "move" : null
                })
            })
        }
    });

    function setTran(flag) {
        if (flag) {
            outer.style.webkitTransitionDuration = "0.5s";
            return;
        }
        outer.style.webkitTransitionDuration = "0.5s";
    }


})();