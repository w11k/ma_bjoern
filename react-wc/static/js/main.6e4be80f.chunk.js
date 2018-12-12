(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
    119: function (e, t, n) {
    }, 129: function (e, t, n) {
        'use strict';
        n.r(t);
        var a, r, i, o = n(1), c = n.n(o), l = n(84), s = n(3), u = n(2), d = n(6), p = n(0), h = n(5), m = n(138),
            f = n(139), b = n(136), E = n(137), v = n(68);
        !function (e) {
            e.ALL = 'all', e.ACTIVE = 'active', e.COMPLETED = 'completed', e.NONE = 'none';
        }(a || (a = {})), function (e) {
            e.EDIT = 'Edit', e.DELETE = 'Delete', e.CANCEL = 'Cancel';
        }(r || (r = {}));
        var g = {
            todos: {
                url: '/todos',
                title: 'Todos',
                icon: 'list',
                tabs: (i = {}, Object(v.a)(i, a.ALL, {
                    url: '/todos/'.concat(a.ALL),
                    title: 'All',
                    icon: 'list'
                }), Object(v.a)(i, a.ACTIVE, {
                    url: '/todos/'.concat(a.ACTIVE),
                    title: 'Active',
                    icon: 'check-box-outline-blank'
                }), Object(v.a)(i, a.COMPLETED, {
                    url: '/todos/'.concat(a.COMPLETED),
                    title: 'Completed',
                    icon: 'check-box'
                }), i)
            },
            settings: {url: '/settings', title: 'Settings', icon: 'settings'},
            about: {url: '/about', title: 'About', icon: 'info'}
        }, w = function (e) {
            function t() {
                return Object(s.a)(this, t), Object(d.a)(this, Object(p.a)(t).apply(this, arguments));
            }

            return Object(h.a)(t, e), Object(u.a)(t, [{
                key: 'componentDidMount', value: function () {
                    this.props.setTitle(this.props.title);
                }
            }, {
                key: 'render', value: function () {
                    return c.a.createElement('div', null, 'test');
                }
            }]), t;
        }(c.a.Component), O = n(140);
        var C = Object(O.a)(function (e) {
                return c.a.createElement('div', null, c.a.createElement('app-toolbar', null, 'Menu'), c.a.createElement('div', {role: 'listbox'}, Object.values(g).map(function (t) {
                    return c.a.createElement('paper-item', {
                        onClick: function () {
                            e.history.push(t.url), e.closeDrawer();
                        }, key: t.title
                    }, c.a.createElement('iron-icon', {icon: t.icon}), t.title, c.a.createElement('paper-ripple', null));
                })));
            }), j = function (e) {
                function t() {
                    return Object(s.a)(this, t), Object(d.a)(this, Object(p.a)(t).apply(this, arguments));
                }

                return Object(h.a)(t, e), Object(u.a)(t, [{
                    key: 'componentDidMount', value: function () {
                        this.props.setTitle(this.props.title);
                    }
                }, {
                    key: 'render', value: function () {
                        return c.a.createElement('div', null, 'test');
                    }
                }]), t;
            }(c.a.Component), y = n(88), k = n(49), T = n(90), A = n(26), L = n(89), I = function () {
                function e() {
                    Object(s.a)(this, e), this.storage = L.a, this.storage.items = this.storage.items || new Array;
                }

                return Object(u.a)(e, [{
                    key: 'getAllItems', value: function () {
                        return this.storage.items;
                    }
                }, {
                    key: 'getItem', value: function (e) {
                        return this.storage.items.find(function (t) {
                            return t.id === e;
                        });
                    }
                }, {
                    key: 'createItem', value: function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
                            t = {id: (new Date).getTime(), title: e.trim(), completed: !1};
                        this.storage.items = this.storage.items.concat(t);
                    }
                }, {
                    key: 'updateItem', value: function (e, t) {
                        var n = this.storage.items.findIndex(function (t) {
                            return t.id === e;
                        });
                        if (!(n < 0)) {
                            var a = Object.assign(this.storage.items[n], t);
                            this.storage.items = Object(A.a)(this.storage.items.slice(0, n)).concat([a], Object(A.a)(this.storage.items.slice(n + 1)));
                        }
                    }
                }, {
                    key: 'deleteItem', value: function (e) {
                        var t = this.storage.items.findIndex(function (t) {
                            return t.id === e;
                        });
                        t < 0 || (this.storage.items = Object(A.a)(this.storage.items.slice(0, t)).concat(Object(A.a)(this.storage.items.slice(t + 1))));
                    }
                }, {
                    key: 'getCount', value: function () {
                        return this.storage.items.reduce(function (e, t) {
                            return {active: e.active + +!t.completed, completed: e.completed + +t.completed, all: ++e.all};
                        }, {active: 0, completed: 0, all: 0});
                    }
                }]), e;
            }(), x = Object(k.a)(new I), D = function (e) {
                function t() {
                    var e, n;
                    Object(s.a)(this, t);
                    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++) i[o] = arguments[o];
                    return (n = Object(d.a)(this, (e = Object(p.a)(t)).call.apply(e, [this].concat(i)))).menu = c.a.createRef(), n.checkbox = c.a.createRef(), n.handleContextMenuClick = function (e) {
                        var t = e.target;
                        Object.values(r).includes(t.dataset.action) && n.props.onSheetAction(t.dataset.action);
                    }, n.handleCheckboxChange = function (e) {
                        var t = e.target;
                        n.props.onChange(t.checked);
                    }, n;
                }

                return Object(h.a)(t, e), Object(u.a)(t, [{
                    key: 'componentDidMount', value: function () {
                        var e = this;
                        this.menu.current && (this.menu.current.renderer = function (t) {
                            var n = t.firstElementChild;
                            n || ((n = document.createElement('div')).setAttribute('role', 'listbox'), n.classList.add('menu_list'), n.innerHTML = '\n                        <paper-item data-action="'.concat(r.EDIT, '">\n                            ').concat(r.EDIT, '\n                            <paper-ripple/>\n                        </paper-item>\n                        <paper-item data-action="').concat(r.DELETE, '">\n                            ').concat(r.DELETE, '\n                            <paper-ripple/>\n                        </paper-item>\n                        <hr>\n                        <paper-item data-action="').concat(r.CANCEL, '">\n                            ').concat(r.CANCEL, '\n                            <paper-ripple/>\n                        </paper-item>\n                    '), n.querySelectorAll('paper-item').forEach(function (t) {
                                t.addEventListener('click', e.handleContextMenuClick);
                            }), t.appendChild(n));
                        }), this.checkbox.current && this.checkbox.current.addEventListener('change', this.handleCheckboxChange);
                    }
                }, {
                    key: 'componentWillUnmount', value: function () {
                        var e = this;
                        if (this.menu.current) {
                            var t = this.menu.current.querySelector('.menu_list');
                            t && t.querySelectorAll('paper-item').forEach(function (t) {
                                t.removeEventListener('click', e.handleContextMenuClick);
                            });
                        }
                        this.checkbox.current && this.checkbox.current.removeEventListener('change', this.handleCheckboxChange);
                    }
                }, {
                    key: 'render', value: function () {
                        return c.a.createElement('vaadin-context-menu', {ref: this.menu}, c.a.createElement('paper-item', null, c.a.createElement('paper-checkbox', Object.assign({ref: this.checkbox}, this.props.item.completed ? {checked: !0} : {})), c.a.createElement('span', {className: 'label'}, this.props.item.title)));
                    }
                }]), t;
            }(c.a.Component), N = function (e) {
                function t(e) {
                    var n;
                    return Object(s.a)(this, t), (n = Object(d.a)(this, Object(p.a)(t).call(this, e))).handleSheetClose = function (e, t) {
                        switch (e) {
                            case r.EDIT:
                                n.presentAlertPrompt(t);
                                break;
                            case r.DELETE:
                                n.model.deleteItem(t.id);
                                break;
                            case r.CANCEL:
                        }
                    }, n.presentAlertPrompt = function (e) {
                        setTimeout(function () {
                            var t = window.prompt('Edit Item', e.title);
                            if ('string' === typeof t) return '' === t.trim() ? window.alert('No input!') : e.title === t ? window.alert('No change!') : void n.model.updateItem(e.id, {title: t});
                        }, 300);
                    }, n.model = x, n.listType = n.props.type, n;
                }

                return Object(h.a)(t, e), Object(u.a)(t, [{
                    key: 'render', value: function () {
                        var e = this, t = this.model.getAllItems().filter(function (t) {
                            switch (e.listType) {
                                case a.ALL:
                                    return !0;
                                case a.ACTIVE:
                                    return !t.completed;
                                case a.COMPLETED:
                                    return t.completed;
                                case a.NONE:
                                default:
                                    return !1;
                            }
                        }).map(function (t) {
                            return c.a.createElement(D, {
                                item: t, key: t.id, onChange: function (n) {
                                    return e.model.updateItem(t.id, {completed: n});
                                }, onSheetAction: function (n) {
                                    return e.handleSheetClose(n, t);
                                }
                            });
                        });
                        return c.a.createElement('div', null, c.a.createElement('div', {className: 'list-container'}, t));
                    }
                }]), t;
            }(c.a.Component), P = Object(k.b)(N), M = function (e) {
                function t(e) {
                    var n;
                    return Object(s.a)(this, t), (n = Object(d.a)(this, Object(p.a)(t).call(this, e))).state = {activeTab: 0}, n.handleChangeIndex = function (e) {
                        n.setState({activeTab: e});
                    }, n.presentAlertPrompt = function () {
                        setTimeout(function () {
                            var e = window.prompt('Create Item');
                            if ('string' === typeof e) return '' === e.trim() ? window.alert('No input!') : void n.model.createItem(e);
                        }, 300);
                    }, n.model = x, n;
                }

                return Object(h.a)(t, e), Object(u.a)(t, [{
                    key: 'componentDidMount', value: function () {
                        this.props.setTitle(this.props.title);
                    }
                }, {
                    key: 'render', value: function () {
                        var e = this, t = this.props.history, n = Object.entries(g.todos.tabs).map(function (n) {
                            var a = Object(y.a)(n, 2), r = a[0], i = a[1];
                            return c.a.createElement('paper-tab', {
                                key: i.title, onClick: function () {
                                    return t.push(i.url);
                                }
                            }, c.a.createElement('iron-icon', {
                                icon: i.icon,
                                id: 'tab' + [r]
                            }), c.a.createElement('span', null, i.title), c.a.createElement('paper-badge', {
                                label: e.model.getCount()[r],
                                for: 'tab' + [r]
                            }));
                        });
                        return c.a.createElement('div', {className: 'tab-container'}, c.a.createElement('paper-tabs', {selected: this.state.activeTab}, n), c.a.createElement(T.a, {
                            index: this.state.activeTab,
                            onChangeIndex: this.handleChangeIndex
                        }, c.a.createElement(b.a, {
                            path: g.todos.tabs[a.ALL].url, render: function (e) {
                                return c.a.createElement(P, Object.assign({type: a.ALL}, e));
                            }
                        }), c.a.createElement(b.a, {
                            path: g.todos.tabs[a.ACTIVE].url, render: function (e) {
                                return c.a.createElement(P, Object.assign({type: a.ACTIVE}, e));
                            }
                        }), c.a.createElement(b.a, {
                            path: g.todos.tabs[a.COMPLETED].url, render: function (e) {
                                return c.a.createElement(P, Object.assign({type: a.COMPLETED}, e));
                            }
                        })), c.a.createElement('paper-fab', {icon: 'add', onClick: this.presentAlertPrompt}));
                    }
                }]), t;
            }(c.a.Component), S = Object(O.a)(Object(k.b)(M)), W = function (e) {
                function t() {
                    var e, n;
                    Object(s.a)(this, t);
                    for (var a = arguments.length, r = new Array(a), i = 0; i < a; i++) r[i] = arguments[i];
                    return (n = Object(d.a)(this, (e = Object(p.a)(t)).call.apply(e, [this].concat(r)))).state = {
                        title: 'Todos',
                        drawerPersistent: !0
                    }, n.drawer = c.a.createRef(), n.layout = c.a.createRef(), n.handleLayoutChange = function (e) {
                        n.setState({drawerPersistent: !e.detail.value});
                    }, n.handleDrawerClose = function () {
                        n.drawer.current && !n.state.drawerPersistent && n.drawer.current.close();
                    }, n.setTitle = function (e) {
                        n.setState({title: e});
                    }, n;
                }

                return Object(h.a)(t, e), Object(u.a)(t, [{
                    key: 'componentDidMount', value: function () {
                        this.layout.current && (this.state.drawerPersistent = !this.layout.current.narrow, this.layout.current.addEventListener('narrow-changed', this.handleLayoutChange));
                    }
                }, {
                    key: 'render', value: function () {
                        var e = this;
                        return c.a.createElement(m.a, null, c.a.createElement('div', null, c.a.createElement('app-drawer-layout', {
                            forceNarrow: !0,
                            ref: this.layout
                        }, c.a.createElement('app-drawer', {
                            slot: 'drawer',
                            'swipe-open': 'true',
                            ref: this.drawer
                        }, c.a.createElement(C, {
                            closeDrawer: function () {
                                return e.handleDrawerClose();
                            }
                        })), c.a.createElement('app-header-layout', null, c.a.createElement('app-header', {
                            effects: 'waterfall',
                            reveals: !0,
                            slot: 'header'
                        }, c.a.createElement('app-toolbar', null, !this.state.drawerPersistent && c.a.createElement('paper-icon-button', {
                            'drawer-toggle': !0,
                            icon: 'menu'
                        }), c.a.createElement('div', {'main-title': 'true'}, this.state.title))), c.a.createElement(f.a, null, c.a.createElement(b.a, {
                            path: g.todos.url,
                            render: function (t) {
                                return c.a.createElement(S, Object.assign({}, t, {
                                    title: g.todos.title,
                                    setTitle: e.setTitle
                                }));
                            }
                        }), c.a.createElement(b.a, {
                            path: g.settings.url, render: function (t) {
                                return c.a.createElement(j, Object.assign({}, t, {
                                    title: g.settings.title,
                                    setTitle: e.setTitle
                                }));
                            }
                        }), c.a.createElement(b.a, {
                            path: g.about.url, render: function (t) {
                                return c.a.createElement(w, Object.assign({}, t, {
                                    title: g.about.title,
                                    setTitle: e.setTitle
                                }));
                            }
                        }), c.a.createElement(E.a, {to: g.todos.tabs.all.url}))))));
                    }
                }]), t;
            }(c.a.Component),
            R = (n(119), Boolean('localhost' === window.location.hostname || '[::1]' === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));

        function V(e, t) {
            navigator.serviceWorker.register(e, t).then(function (e) {
                e.onupdatefound = function () {
                    var n = e.installing;
                    null != n && (n.onstatechange = function () {
                        'installed' === n.state && (navigator.serviceWorker.controller ? (console.log('New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA.'), t && t.onUpdate && t.onUpdate(e)) : (console.log('Content is cached for offline use.'), t && t.onSuccess && t.onSuccess(e)));
                    });
                };
            }).catch(function (e) {
                console.error('Error during service worker registration:', e);
            });
        }

        n(121), n(122), n(123), n(124), n(130), n(125), n(47), n(126), n(127), n(132), n(133), n(81), n(134), n(80), n(82), n(131), n(128);
        l.render(o.createElement(W, null), document.querySelector('#root')), function (e) {
            if ('serviceWorker' in navigator) {
                if (new URL('/ma_bjoern/react-wc', window.location.href).origin !== window.location.origin) return;
                window.addEventListener('load', function () {
                    var t = ''.concat('/ma_bjoern/react-wc', '/service-worker.js');
                    R ? (function (e, t) {
                        fetch(e).then(function (n) {
                            var a = n.headers.get('content-type');
                            404 === n.status || null != a && -1 === a.indexOf('javascript') ? navigator.serviceWorker.ready.then(function (e) {
                                e.unregister().then(function () {
                                    window.location.reload();
                                });
                            }) : V(e, t);
                        }).catch(function () {
                            console.log('No internet connection found. App is running in offline mode.');
                        });
                    }(t, e), navigator.serviceWorker.ready.then(function () {
                        console.log('This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA');
                    })) : V(t, e);
                });
            }
        }({scope: '/ma_bjoern/react-wc/'});
    }, 91: function (e, t, n) {
        e.exports = n(129);
    }
}, [[91, 2, 1]]]);
//# sourceMappingURL=main.6e4be80f.chunk.js.map