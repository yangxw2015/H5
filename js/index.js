(function () {
    var winH = document.documentElement.clientHeight;
    var outer = document.querySelector(".outer");
    var inner = document.querySelector(".inner");
    var pageList = [].slice.call(document.querySelectorAll("section"), 0);
    var count = pageList.length;
    var tip = document.querySelector(".tip");
    var index = 0;
    //console.log(count);
    //console.log(outer);


    inner.style.height = count * winH + "px";
    console.log(inner.style.height);
    pageList.forEach(function (cur) {
        cur.style.height = winH + "px";
        console.log(cur.style.height);
    });

    var body = document.body;
    $t.swipeUp(body, {
        start: function (e) {
            this["isEnd"] = false;
            this["changePos"] = 0;
            this["strTop"] = parseFloat(inner.style.top);
        },
        move: function (e) {
            if (index >= (count - 1)) {
                this["isEnd"] = true;
                return;
            }
            var changePos = this["endYswipeUp"] - this["strYswipeUp"];
            this["changePos"] = changePos;
            inner.style.top = this["strTop"] + changePos + "px";
        },
        end: function (e) {
            if (this["isEnd"]) {
                return;
            }
            setTran(true);
            var changePos = this["changePos"];
            if (Math.abs(changePos) / winH >= 0.25) {
                index++;
                tip.style.display = index >= (count - 1) ? "none" : "block";
            }
            inner.style.top = -index * winH + "px";

            window.setTimeout(function () {
                setTran(false);
                pageList.forEach(function (cur, i) {
                    cur.className = i === index ? "move" : null
                });
            },500);
        }
    });

    $t.swipeDown(body, {
        start: function (e) {
            this["isEnd"] = false;
            this["changePos"] = 0;
            this["strTop"] = parseFloat(inner.style.top);
        },
        move: function (e) {
            if (index >(count - 1)) {
                this["isEnd"] = true;
                return;
            }
            var changePos = this["endYswipeDown"] - this["strYswipeDown"];
            this["changePos"] = changePos;
            inner.style.top = this["strTop"] + changePos + "px";
        },
        end: function (e) {
            if (this["isEnd"]) {
                return;
            }
            setTran(true);
            var changePos = this["changePos"];
            if (Math.abs(changePos) / winH >= 0.25) {
                index--;
                tip.style.display = index >= (count - 1) ? "none" : "block";
            }
            inner.style.top = -index * winH + "px";

            window.setTimeout(function () {
                setTran(false);
                pageList.forEach(function (cur, i) {
                    cur.className = i === index ? "move" : null;
                })
            },500);
        }
    });

    function setTran(flag) {
        if (flag) {
            inner.style.webkitTransitionDuration = "0.5s";
            return;
        }
        inner.style.webkitTransitionDuration = "0s";
    };
    window.setTimeout(function () {
        setTran(false);
        pageList[0].className = "move";
    }, 500);

})();