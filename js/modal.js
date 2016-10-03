for (var MaterialModal = function(a) {
        "use strict";
        this.trigger = a, this.initModal = function() {
            var a = this.trigger.dataset.modal,
                b = a.length,
                c = a.substring(1, b),
                d = document.getElementById(c);
            if (d) this.modal = d, this.setElements(), this.bindActions();
            else if (this.trigger.dataset.hasOwnProperty("modalSrc")) {
                var e = new XMLHttpRequest;
                e.onreadystatechange = function() {
                    if (4 == e.readyState && 200 == e.status) {
                        var a;
                        this.trigger.dataset.hasOwnProperty("modalTarget") ? (a = document.querySelector(this.trigger.dataset.modalTarget), a || console.error("Invalid modal-target property on this.trigger")) : (a = document.createElement("div"), document.body.appendChild(a)), a.innerHTML = e.responseText, d = document.getElementById(c), d ? (this.modal = d, this.setElements(), this.bindActions()) : console.error("No modal corresponding to this.trigger in loaded content")
                    }
                }.bind(this), e.open("GET", this.trigger.dataset.modalSrc, !0), e.send()
            } else console.error("Missing modal and no modal-src for async loading")
        }, this.setElements = function() {
            this.content = this.modal.querySelector(".modal__content"), this.closers = this.modal.querySelector(".modal__close"), this.modalsbg = this.modal.querySelector(".modal__bg"), this.modalsbg || (this.modalsbg = []), /modal__bg/.test(this.modal.className) && this.modalsbg.push(this.modal)
        }, this.bindActions = function() {
            this.trigger.addEventListener("click", this.open.bind(this), !1);
            for (var a = 0; a < this.closers.length; a++) this.closers[a].addEventListener("click", this.close.bind(this), !1);
            for (var a = 0; a < this.modalsbg.length; a++) this.modalsbg[a].addEventListener("click", this.close.bind(this), !1)
        }, this.close = function(a) {
            function b() {
                setTimeout(function() {
                    window.requestAnimationFrame(function() {
                        this.div.remove()
                    }.bind(this))
                }.bind(this), d - 50)
            }
            var c = a.target,
                d = 400;
            (this.isOpen && c.classList.contains("modal__bg") || c.classList.contains("modal__close")) && (a.preventDefault(), a.stopImmediatePropagation(), this.div.style.opacity = "1", this.div.removeAttribute("style"), this.trigger.style.transform = "none", this.trigger.style.webkitTransform = "none", this.trigger.classList.remove("modal__trigger--active"), this.modal.classList.remove("modal--active"), this.content.classList.remove("modal__content--active"), this.div.addEventListener("transitionend", b.bind(this), !1), this.isOpen = !1)
        }, this.open = function(a) {
            a.preventDefault();
            var b = 400,
                c = function() {
                    var a = document.getElementById("modal__temp");
                    null === a && (this.div = document.createElement("div"), this.div.id = "modal__temp", this.trigger.appendChild(this.div), this.div.style.backgroundColor = window.getComputedStyle(this.trigger).backgroundColor, d())
                }.bind(this),
                d = function() {
                    var a, c, d, f, g = this.trigger.getBoundingClientRect(),
                        h = this.modal.querySelector(".modal__content").getBoundingClientRect(),
                        i = window.innerWidth / 2,
                        j = window.innerHeight / 2;
                    this.trigger.classList.add("modal__trigger--active"), d = h.width / g.width, f = h.height / g.height, d = d.toFixed(3), f = f.toFixed(3), a = Math.round(i - g.left - g.width / 2), c = Math.round(j - g.top - g.height / 2), this.modal.classList.contains("modal--align-top") && (c = Math.round(h.height / 2 + h.top - g.top - g.height / 2)), this.trigger.style.transform = "translate(" + a + "px, " + c + "px)", this.trigger.style.webkitTransform = "translate(" + a + "px, " + c + "px)", this.div.style.backgroundColor = "#fff", this.div.style.transform = "scale(" + d + "," + f + ")", this.div.style.webkitTransform = "scale(" + d + "," + f + ")", window.setTimeout(function() {
                        window.requestAnimationFrame(function() {
                            e()
                        }.bind(this))
                    }.bind(this), b)
                }.bind(this),
                e = function() {
                    if (!this.isOpen) {
                        var a = this.modal.querySelector(".modal__content");
                        this.modal.classList.add("modal--active"), a.classList.add("modal__content--active"), a.addEventListener("transitionend", f.bind(this), !1), this.isOpen = !0
                    }
                }.bind(this),
                f = function() {
                    this.div.style.opacity = "0", this.content.removeEventListener("transitionend", f.bind(this), !1)
                }.bind(this);
            c()
        }, this.initModal()
    }, triggers = document.querySelectorAll(".modal__trigger"), modals = [], j = 0; j < triggers.length; j++) new MaterialModal(triggers[j]);