(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (factory((global['react-responsive'] = {}),global.React));
}(this, (function (exports,React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var providerMap = function providerMap(object, func) {
    return Object.assign.apply(Object, [{}].concat(toConsumableArray(Object.keys(object).map(function (key) {
      return defineProperty({}, key, func(object[key]));
    }))));
  };

  var defaultSizes = {
    mobile: [-Infinity, 767],
    tablet: [768, 1023],
    desktop: [1024, +Infinity]
  };

  var ResponsiveContext = React__default.createContext({});

  var ResponsiveProviderBase = function (_PureComponent) {
    inherits(ResponsiveProviderBase, _PureComponent);

    function ResponsiveProviderBase(props) {
      classCallCheck(this, ResponsiveProviderBase);

      var _this = possibleConstructorReturn(this, (ResponsiveProviderBase.__proto__ || Object.getPrototypeOf(ResponsiveProviderBase)).call(this, props));

      _this.onWindowResize = function () {
        return _this.setState(_this.actualResponsiveState());
      };

      _this.state = _this.actualResponsiveState();
      return _this;
    }

    createClass(ResponsiveProviderBase, [{
      key: 'actualResponsiveState',
      value: function actualResponsiveState() {
        var actualWidth = this.width();
        var detectSize = function detectSize(size) {
          return actualWidth >= size[0] && actualWidth <= size[1];
        };
        return providerMap(this.props.sizes, detectSize);
      }
    }, {
      key: 'render',
      value: function render() {
        return React__default.createElement(
          ResponsiveContext.Provider,
          { value: this.state },
          this.props.children
        );
      }
    }]);
    return ResponsiveProviderBase;
  }(React.PureComponent);

  ResponsiveProviderBase.defaultProps = {
    sizes: defaultSizes
  };

  var ResponsiveConsumer = ResponsiveContext;

  var ResponsiveProvider = function (_ResponsiveProviderBa) {
    inherits(ResponsiveProvider, _ResponsiveProviderBa);

    function ResponsiveProvider() {
      classCallCheck(this, ResponsiveProvider);
      return possibleConstructorReturn(this, (ResponsiveProvider.__proto__ || Object.getPrototypeOf(ResponsiveProvider)).apply(this, arguments));
    }

    createClass(ResponsiveProvider, [{
      key: 'width',
      value: function width() {
        return window.innerWidth;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('resize', this.onWindowResize, false);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
      }
    }]);
    return ResponsiveProvider;
  }(ResponsiveProviderBase);

  exports.ResponsiveConsumer = ResponsiveConsumer;
  exports.ResponsiveProvider = ResponsiveProvider;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
