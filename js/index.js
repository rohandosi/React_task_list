"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  } }

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); }
    subClass.prototype = Object.create(superClass && superClass.prototype,
      { constructor: {
      value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
    } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}


// stateless component
var Title = function Title() {
  return React.createElement(
    "div",
    { id: "titleWrapper" },
    React.createElement(
      "h2",
      { className: "textCenter" },
      "Task List"
    )
  );
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      value: ''
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleNewTodoAddition = _this.handleNewTodoAddition.bind(_this);
    return _this;
  }

  Form.prototype.handleChange = function handleChange(event) {
    this.setState({
      value: event.target.value
    });
  };

  Form.prototype.handleNewTodoAddition = function handleNewTodoAddition() {
    if (this.input.value !== '') {
      this.props.addTodo(this.input.value);
      this.setState({
        value: ''
      });
      this.input.placeholder = "Add tasks here...";
    }
  };

  Form.prototype.render = function render() {
    var _this2 = this;

    return(
      // ref should be passed a callback
      // with underlying dom element as its
      // argument to get its reference
      React.createElement(
        "div",
        { id: "form" },
        React.createElement("input", {
          ref: function ref(node) {
            _this2.input = node;
          },
          value: this.state.value,
          placeholder: "Add tasks here...",
          autocomplete: "off",
          onChange: this.handleChange
        }),
        React.createElement(
          "button",
          {
            onClick: this.handleNewTodoAddition
          },
          "+"
        )
      )
    );
  };

  return Form;
}(React.Component);

var Todo = function Todo(_ref) {
  var todo = _ref.todo;
  var remove = _ref.remove;

  // single todo
  return React.createElement(
    "p",
    { className: "todos" },
    todo.value,
    React.createElement(
      "span",
      {
        className: "removeBtn",
        onClick: function onClick() {
          remove(todo.id);
        } },
      "x"
    )
  );
};

var List = function List(_ref2) {
  var todos = _ref2.todos;
  var remove = _ref2.remove;

  var allTodos = [];

  if (todos.length > 0) {
    allTodos = todos.map(function (todo) {
      // passing todo and remove method reference
      return React.createElement(Todo, { todo: todo, remove: remove });
      //return (<p>{todo.value}</p>);
    });
  } else {
    allTodos.push(React.createElement(
      "h3",
      { id: "acu" },
      "All caught up !"
    ));
  }

  return React.createElement(
    "div",
    { id: "list" },
    React.createElement(
      "p",
      { id: "info" },
      " Your Todos: "
    ),
    allTodos
  );
};

var Footer = function Footer() {
  return React.createElement(
    "div",
    { id: "footer" },
    React.createElement(
      "a",
      { href: "https://github.com/rohandosi", target: "_blank" },
      React.createElement(
        "p",
        null,
        "Rohan Dosi "
      )
    )
  );
};

var Container = function (_React$Component2) {
  _inherits(Container, _React$Component2);

  function Container(props) {
    _classCallCheck(this, Container);

    // data for introduction to app
    // for new users

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    var introData = [{
      id: -3,
      value: "Hi! This is a simple task list"
    }, {
      id: -2,
      value: "Add and delete tasks as you wish!"
    }, {
      id: -1,
      value: "Enjoy!"
    }];

    var localData = localStorage.todos && JSON.parse(localStorage.todos);

    _this3.state = {
      data: localData || introData
    };

    // binding methods
    _this3.addTodo = _this3.addTodo.bind(_this3);
    _this3.removeTodo = _this3.removeTodo.bind(_this3);
    return _this3;
  }
  // Handler to update localStorage

  Container.prototype.updateLocalStorage = function updateLocalStorage() {
    if (typeof Storage !== "undefined") localStorage.todos = JSON.stringify(this.state.data);
  };
  // Handler to add todo

  Container.prototype.addTodo = function addTodo(val) {
    var _this4 = this;

    var id = undefined;
    // if localStorage is available then increase localStorage count
    // else use global window object's id variable
    if (typeof Storage !== "undefined") {
      id = Number(localStorage.count);
      localStorage.count = Number(localStorage.count) + 1;
    } else {
      id = window.id++;
    }

    var todo = {
      value: val,
      id: id
    };

    this.state.data.push(todo);
    // update state
    this.setState({
      data: this.state.data
    }, function () {
      // update localStorage
      _this4.updateLocalStorage();
    });
  };
  // Handler to remove todo

  Container.prototype.removeTodo = function removeTodo(id) {
    var _this5 = this;

    // filter out the todo that has to be removed
    var list = this.state.data.filter(function (todo) {
      if (todo.id !== id) return todo;
    });
    // update state
    this.setState({
      data: list
    }, function () {
      // update localStorage
      _this5.updateLocalStorage();
    });
  };

  Container.prototype.componentDidMount = function componentDidMount() {
    localStorage.clear();
    if (typeof Storage !== "undefined") {
      if (!localStorage.todos) {
        localStorage.todos = JSON.stringify(this.state.data);
      }
      if (!localStorage.count) {
        localStorage.count = 0;
      }
    } else {
      console.log("%cApp will not remember todos created as LocalStorage Is Not Available", "color: hotpink; background: #333; font-size: x-large;font-family: Courier;");
      window.id = 0;
    }
  };

  Container.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "container" },
      React.createElement(Title, null),
      React.createElement(Form, { addTodo: this.addTodo }),
      React.createElement(List, { todos: this.state.data, remove: this.removeTodo }),
      React.createElement(Footer, null)
    );
  };

  return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), app);