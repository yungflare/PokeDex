let pokemonRepository = function () {
    let e = [];

    function t(t) {
        e.push(t)
    }

    function n() {
        return e
    }

    function i(e) {
        a(e).then(function () {
            var t, n, i, o, r;
            let a, l, c, s, u, p, d;
            t = e.name, n = e.height, i = e.imageUrl, o = e.types, r = e.abilities, a = document.querySelector("#pokemonModalLabel"), l = document.querySelector("#modal-height"), c = document.querySelector("#modal-types"), s = document.querySelector("#modal-abilities"), u = document.createElement("img"), u.src = i, u.classList.add("img"), a.innerHTML = "", l.innerHTML = "", c.innerHTML = "", s.innerHTML = "", a.innerHTML = t, l.innerHTML = `Height: ${n}m `, p = o.map(function (e) {
                return e.type.name
            }).join(" , "), c.innerHTML = `Type: ${p}`, d = r.map(function (e) {
                return e.ability.name
            }).join(" , "), s.innerHTML = `Abilities: ${d}`, l.appendChild(u)
        })
    }

    function o() {
        let e = document.createElement("p");
        e.textContent = "Loading...", document.body.appendChild(e)
    }

    function r() {
        let e = document.querySelector("p");
        e && e.remove()
    }

    function a(e) {
        return o(), fetch(e.detailsUrl).then(function (e) {
            return r(), e.json()
        }).then(function (t) {
            e.imageUrl = t.sprites.front_default, e.height = t.height, e.types = t.types, e.abilities = t.abilities
        }).catch(function (e) {
            r(), console.error(e)
        })
    }
    return {
        add: t,
        getAll: n,
        addListItem: function e(t) {
            let n = document.querySelector(".pokemon-list"),
                o = document.createElement("li");
            o.classList.add("list-group-item");
            let r = document.createElement("button");
            r.setAttribute("data-toggle", "modal"), r.setAttribute("data-target", "#pokemonModal"), r.innerText = t.name, r.classList.add("btn", "btn-primary", "btn-lg", "btn-block"), r.addEventListener("click", function () {
                i(t)
            }), o.append(r), n.append(o)
        },
        loadList: function e() {
            return o(), fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function (e) {
                return r(), e.json()
            }).then(function (e) {
                e.results.forEach(function (e) {
                    t({
                        name: e.name,
                        detailsUrl: e.url
                    })
                })
            }).catch(function (e) {
                r(), console.error(e)
            })
        },
        loadDetails: a,
        showDetails: i
    }
}();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e)
    })
});