(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rsm"] = factory();
	else
		root["rsm"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CodeTable.js":
/*!**************************!*\
  !*** ./src/CodeTable.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _originalData = /*#__PURE__*/new WeakMap();

var _currentFrameData = /*#__PURE__*/new WeakMap();

/**
 * 代表码位表。每一个站场图有一套对应的码位表，没有站场图的码位表没有意义。码位表对当前站场图的所有（信号机信号、红白光带信号）的全部状态（主要是颜色状态）进行编码。此后，后端将依据这套编码规则定时向前端发送一组编号，前端根据码位表中的编码规则将这些编号转换成可视化语言呈现在页面上。
 * @class
 */
class CodeTable {
  /**
   * 码位表原始数据对象
   */

  /**
   * 当前解析后的编码值
   */

  /**
   * 初始化一个码位表实例
   * @param {*} data
   */
  constructor() {
    _classPrivateFieldInitSpec(this, _originalData, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _currentFrameData, {
      writable: true,
      value: []
    });
  }
  /**
   * 设置码位表数据
   * @param {*} data
   */


  set(data) {
    /**
     * 每次设置前先置空
     */
    _classPrivateFieldSet(this, _originalData, {});

    for (let key in data) {
      const value = data[key];
      /**
       * 过滤掉值为 NULL 的码位
       */

      if (value === "NULL") continue;
      _classPrivateFieldGet(this, _originalData)[key] = value;
    }
  }
  /**
   * 按照一组编号从码位表解析出需要变化的颜色值
   * @param {*} numbers - 一组编号
   * @returns numbers
   */


  parse() {
    let numbers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return numbers.map(num => {
      return _classPrivateFieldGet(this, _originalData)[num];
    }).filter(d => d);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeTable);

/***/ }),

/***/ "./src/Layer.js":
/*!**********************!*\
  !*** ./src/Layer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * 代表层
 * @class
 */

class Layer {
  /**
   * 唯一标识符
   */

  /**
   * 存储层中的所有图形化实例
   */

  /**
   * d3 包裹的 g 元素
   */

  /**
   * @construct
   */
  constructor(_ref) {
    let {
      $,
      id
    } = _ref;

    _defineProperty(this, "uid", (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateUID)());

    _defineProperty(this, "children", []);

    _defineProperty(this, "$element", void 0);

    this.$element = $;
    this.$element.attr("id", id || this.uid);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layer);

/***/ }),

/***/ "./src/Layers.js":
/*!***********************!*\
  !*** ./src/Layers.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * 管理所有层
 * @class
 */

class Layers {
  /**
   * 唯一标识符
   */

  /**
   * group element
   */

  /**
   * 构造一个层管理器
   * @construct
   */
  constructor(_ref) {
    let {
      $,
      id
    } = _ref;

    _defineProperty(this, "uid", (0,_utils__WEBPACK_IMPORTED_MODULE_0__.generateUID)());

    _defineProperty(this, "$element", void 0);

    this.$element = $;
    this.$element.attr("id", id || this.uid);
  }
  /**
   * 添加新的层实例
   * @param {*} layer - Layer 示例
   */


  add(layer) {
    this.$element.node().appendChild(layer.$element.node());
  }
  /**
   * 从 id 获取层
   * @param {string} id
   */


  get(id) {
    return this.$element.select("#".concat(id));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layers);

/***/ }),

/***/ "./src/Station.js":
/*!************************!*\
  !*** ./src/Station.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layer */ "./src/Layer.js");
/* harmony import */ var _Layers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layers */ "./src/Layers.js");
/* harmony import */ var _CodeTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CodeTable */ "./src/CodeTable.js");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }




/**
 * 代表整个车站
 * @class
 */

var _redrawTurnoutsTextColor = /*#__PURE__*/new WeakSet();

class Station {
  /**
   * 管理所有层
   */

  /**
   * 构造一个车站实例
   * @construct
   * @param {d3.selection} $svg - svg元素
   */
  constructor($svg) {
    _classPrivateMethodInitSpec(this, _redrawTurnoutsTextColor);

    _defineProperty(this, "layers", void 0);

    /**
     * 初始化码位表
     */
    this.codeTable = new _CodeTable__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.layers = new _Layers__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $: $svg.append("g")
    });
    /**
     * 绑定缩放平移交互
     */

    $svg.call(d3.zoom().scaleExtent([0.5, 20]).on("zoom", _ref => {
      let {
        transform
      } = _ref;
      this.layers.$element.attr("transform", transform);
    }));
    /**
     * 按照顺序创建
     */

    /**
     * 危险区域层
     */

    this.layers.add(new _Layer__WEBPACK_IMPORTED_MODULE_0__["default"]({
      $: this.layers.$element.append("g"),
      id: "dangerous_zone"
    }));
    /**
     * 工作区域层
     */

    this.layers.add(new _Layer__WEBPACK_IMPORTED_MODULE_0__["default"]({
      $: this.layers.$element.append("g"),
      id: "working_area"
    }));
    /**
     * 原始站场图层
     */

    this.layers.add(new _Layer__WEBPACK_IMPORTED_MODULE_0__["default"]({
      $: $svg.select("g#all"),
      id: "station_original_map"
    }));
    /**
     * 轨道信号颜色层
     */

    this.layers.add(new _Layer__WEBPACK_IMPORTED_MODULE_0__["default"]({
      $: this.layers.$element.append("g"),
      id: "track_signal_color"
    }));
    /**
     * 道岔文本颜色层
     */

    this.layers.add(new _Layer__WEBPACK_IMPORTED_MODULE_0__["default"]({
      $: this.layers.$element.append("g"),
      id: "turnouts_signal_color"
    }));
    /**
     * 信号机信号颜色层
     */

    this.layers.add(new _Layer__WEBPACK_IMPORTED_MODULE_0__["default"]({
      $: this.layers.$element.append("g"),
      id: "light_signal_color"
    }));
  }
  /**
   * 重新绘制危险区域
   * @param {*} data
   */


  redrawDangerousZone(data) {
    const $paper = this.layers.get("dangerous_zone");
    /**
     * 清空画布
     */

    $paper.selectAll("polygon").remove();
    /**
     * 将每一块危险区域的数据转换成一个个 polygon 元素
     */

    const $polygon = $paper.selectAll("polygon").data(data).enter().append("polygon").attr("class", "__dangerous_zone_ani").attr("points", function (d) {
      return d.map(point => "".concat(point.x, ",").concat(point.y)).join(" ");
    }).attr("stroke", "yellow").attr("stroke-width", "3").attr("stroke-dasharray", "15,15").attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  }
  /**
   * 重绘轨道信号颜色
   */


  redrawTrackSignalColor(DATA) {
    /**
     * 清空道岔
     */
    let DAO_CHAR = [];
    const $originalMapPaper = this.layers.get("station_original_map");
    const $paper = this.layers.get("track_signal_color");
    $paper.selectAll("line").remove();
    $paper.selectAll("g").remove();
    /**
     * 获取所有符合条件的 g 元素
     * 条件1：class 属性值不为空
     * 条件2：class 属性值不为 "qj"
     */

    const $groupsAvailable = $originalMapPaper.selectAll("g").filter(function () {
      const className = d3.select(this).attr("class");
      return className;
    });
    /**
     * 对满足条件的 group 元素进行操作
     */

    $groupsAvailable.each(function () {
      const $g = d3.select(this);
      const className = $g.attr("class");
      const id = d3.select(this).attr("id");
      /**
       * 将 id 使用逗号分割并去除第一个元素
       * 凡是以 D 或 F 结尾的 id 都能分割成包含至少一个元素的数组
       */

      const id_DotSplitArray = id.split(",");
      id_DotSplitArray.shift();
      /**
       * 存储最终颜色信号
       */

      let colorSignal;
      /**
       * 存储所有颜色信号规则
       */

      let colorSignalRules = DATA.map(signal => {
        /**
         * 将信号值用下划线分割成数组
         * 第一个元素代表：轨道名称
         * 第二个元素代表：颜色信息
         */
        const [_trackId, _colorId] = signal.split("_");

        if (_trackId === className && _colorId) {
          if (!colorSignal || ["R", "G", "Y", "GG", "YY", "GY"].includes(_colorId)) {
            colorSignal = _colorId;
          }

          return _colorId;
        }
      }).filter(d => d);

      if (colorSignalRules.length && colorSignalRules.includes("Y") && colorSignalRules.includes("G")) {
        colorSignal = "GY";
      }

      const id_DotSplitArray_contained_in_DATA = id_DotSplitArray.filter(value => {
        const isContain = DATA.includes(value);

        if (isContain) {
          DAO_CHAR.push(value);
        }

        return isContain;
      });

      if (id.endsWith("D") || id.endsWith("F")) {
        colorSignal = undefined;
      }

      if (!colorSignal) return;
      /**
       * 根据颜色信号改变 g 元素样式
       * 首先克隆 g 元素节点
       */

      const $gClone = $g.clone(true);
      /**
       * 将 g 元素的克隆节点插入到轨道层中
       */

      $paper.node().appendChild($gClone.node());

      if (className === "TG") {
        $gClone.selectAll("line").attr("stroke", "rgb(85, 120, 182)");
        return;
      }
      /**
       * 轨道侧轨不变色
       */


      if ($gClone.classed("road_side")) {
        return;
      }

      switch (colorSignal) {
        case "W":
          $gClone.selectAll("line").attr("stroke", "white").attr("stroke-opacity", 1);
          break;

        case "R":
          $gClone.selectAll("line").attr("stroke", "red").attr("stroke-opacity", 1);
          break;

        case "Y":
          $gClone.selectAll("line").attr("stroke", "yellow").attr("stroke-opacity", 1);
          break;
      }
    });
    /**
     * 获取所有符合条件的 line 元素
     * 条件1：class 属性值不为空
     * 条件2：class 属性值不为 "qj"
     */

    const $linesAvailable = $originalMapPaper.selectAll("line").filter(function () {
      const className = d3.select(this).attr("class");
      return className && className !== "qj";
    });
    /**
     * 对满足条件的 line 元素进行操作
     */

    $linesAvailable.each(function () {
      const $line = d3.select(this);
      const className = $line.attr("class");
      const id = d3.select(this).attr("id");
      /**
       * id 结尾既不是 "D" 也不是 "F"
       */

      const isNotEndsWithDAndF = !id.endsWith("D") && !id.endsWith("F");
      /**
       * 将 id 使用逗号分割并去除第一个元素
       * 凡是以 D 或 F 结尾的 id 都能分割成包含至少一个元素的数组
       */

      const id_DotSplitArray = id.split(",");
      id_DotSplitArray.shift();
      /**
       * 存储最终颜色信号
       */

      let colorSignal;
      /**
       * 存储所有颜色信号规则
       */

      let colorSignalRules = DATA.map(signal => {
        /**
         * 将信号值用下划线分割成数组
         * 第一个元素代表：轨道名称
         * 第二个元素代表：颜色信息
         */
        const [_trackId, _colorId] = signal.split("_");

        if (_trackId === className && _colorId) {
          if (!colorSignal || ["R", "G", "Y", "GG", "YY", "GY"].includes(_colorId)) {
            colorSignal = _colorId;
          }

          return _colorId;
        }
      }).filter(d => d);

      if (colorSignalRules.length && colorSignalRules.includes("Y") && colorSignalRules.includes("G")) {
        colorSignal = "GY";
      }
      /**
       * 猜想：
       */


      const id_DotSplitArray_contained_in_DATA = id_DotSplitArray.filter(value => {
        const isContain = DATA.includes(value);
        DAO_CHAR.push(value);
        return isContain;
      });
      if (!colorSignal) return;
      /**
       * 根据颜色信号改变 line 元素样式
       * 首先克隆 line 元素节点
       */

      const $lineClone = $line.clone();
      /**
       * 将 line 元素的克隆节点插入到轨道层中
       */

      $paper.node().appendChild($lineClone.node());

      if (className === "TG") {
        $lineClone.attr("stroke", "rgb(85, 120, 182)");
        return;
      }
      /**
       * 轨道侧轨不变色
       */


      if ($lineClone.classed("road_side")) {
        return;
      }

      switch (colorSignal) {
        case "W":
          $lineClone.attr("stroke", "white").attr("stroke-opacity", 1);
          break;

        case "R":
          $lineClone.attr("stroke", "red").attr("stroke-opacity", 1);
          break;

        case "Y":
          $lineClone.attr("stroke", "yellow").attr("stroke-opacity", 1);
          break;
      }
    });
    /**
     * 重新绘制道岔文本颜色
     */

    _classPrivateMethodGet(this, _redrawTurnoutsTextColor, _redrawTurnoutsTextColor2).call(this, Array.from(new Set(DAO_CHAR)));
  }
  /**
   * 更新道岔文字颜色
   */


  /**
   * 重绘信号灯颜色
   * @param {*} DATA
   */
  redrawLightSignalColor(DATA) {
    const $originalMapPaper = this.layers.get("station_original_map");
    const $paper = this.layers.get("light_signal_color");
    /**
     * 清空所有 circle 元素
     */

    $paper.selectAll("circle").remove();
    const allID = [];
    const allSignal = [];
    DATA.forEach(d => {
      const [id, signal] = d.split("_");
      allID.push(id);
      allSignal.push(signal);
    });
    /**
     * 遍历所有符合条件的 circle 元素
     * 条件1：class 属性值不为空
     */

    $originalMapPaper.selectAll("circle").filter(function () {
      const className = d3.select(this).attr("class");
      return className;
    }).each(function () {
      /**
       * 这个 circle 有可能并不是信号灯。
       */
      const $circle = d3.select(this);
      const className = $circle.attr("class");
      const signal = allSignal[allID.indexOf(className)];
      /**
       * className 以 _A 结尾说明这个 circle 是信号机的副灯。
       */

      const isAppendLight = className.endsWith("_A");
      /**
       * 若当前 circle 是信号机副灯，解析出信号机主灯的信号
       */

      let mainLightSignal;

      if (isAppendLight) {
        mainLightSignal = allSignal[allID.indexOf(className.slice(0, -2))];
      }
      /**
       * 根据颜色信号改变 circle 元素样式
       * 首先克隆 circle 元素节点
       */


      const $circleClone = $circle.clone();
      /**
       * 将 circle 元素的克隆节点插入到轨道层中
       */

      $paper.node().appendChild($circleClone.node());
      /**
       * 单独处理主灯和副灯
       */

      if (isAppendLight) {
        /**
         * 这里都是副灯
         */
        switch (mainLightSignal) {
          case "Y":
            $circleClone.attr("fill", "#FF0");
            break;

          case "G":
            $circleClone.attr("fill", "#0F0");
            break;

          case "GY":
            $circleClone.attr("fill", "#0F0");
            break;

          case "YY":
            $circleClone.attr("fill", "#FF0");
            break;

          case "GG":
            $circleClone.attr("fill", "#0F0");
            break;

          case "YFY":
            $circleClone.attr("append_light_YFY", "");
            break;
        }
      } else {
        /**
         * 这里都是主灯
         */
        switch (signal) {
          /**
           * R 表示停车信号
           */
          case "R":
            /**
             * className 以 D 开头代表这是调车信号机
             * 调车信号机的停车信号用 蓝色 表示
             */
            if (className.startsWith("D")) {
              $circleClone.attr("fill", "#00F");
              break;
            }
            /**
             * 如果不是调车信号机就用 红色 表示
             */


            $circleClone.attr("fill", "#F00");
            break;

          case "W":
            $circleClone.attr("fill", "#FFF");
            break;

          case "GY":
            $circleClone.attr("fill", "#FF0");
            break;

          case "YY":
            $circleClone.attr("fill", "#FF0");
            break;

          case "GG":
            $circleClone.attr("fill", "#0F0");
            break;

          case "YFY":
            $circleClone.attr("fill", "#FF0");
            break;
        }
      }
    });
  }
  /**
   * 重新绘制工作区域
   * @param {*} data
   */


  redrawWorkingArea(data) {
    const $paper = this.layers.get("working_area");
    $paper.attr("opacity", 0.5);
    /**
     * 清空画布
     */

    $paper.selectAll("polygon").remove();
    /**
     * 将每一块工作区域的数据转换成一个个 polygon 元素
     */

    const $polygon = $paper.selectAll("polygon").data(data).enter().append("polygon").attr("points", function (d) {
      return d.map(point => "".concat(point.x, ",").concat(point.y)).join(" ");
    }).attr("stroke", "none").attr("fill", "#4169E1");
  }

}

function _redrawTurnoutsTextColor2(turnoutsSignals) {
  /**
   * 道岔编号
   */
  let turnoutNumbers = [];
  /**
   * 与道岔编号一一对应的 定位 或 反位 信号
   */

  let turnoutSignals = [];
  /**
   * 遍历解析
   */

  for (let signal of turnoutsSignals) {
    /**
     * 解析字符串
     * 首先去掉 DC 两个字符
     */
    signal = signal.slice(2);

    if (signal.includes("/")) {
      /**
       * 解析出：
       * 1. 包含斜线的两个道岔编号
       * 2. 属于 定位 D 还是 反位 F
       */
      const [numbersWithSlash, mark] = signal.split("_");
      /**
       * 解析出一个数组
       * 包含两个独立的道岔编号
       *
       * 同时这两个道岔编号对应相同的颜色信号
       */

      const numbers = numbersWithSlash.split("/");
      const marks = [mark, mark];
      /**
       * 将这两个编号插入到所有道岔编号的数组中
       */

      turnoutNumbers = turnoutNumbers.concat(numbers);
      /**
       * 将文字颜色信号插入到所有道岔颜色信号的数组中
       */

      turnoutSignals = turnoutSignals.concat(marks);
    } else {
      /**
       * 解析出：
       * 1. 道岔编号
       * 2. 属于 定位 D 还是 反位 F
       */
      const [number, mark] = signal.split("_");
      /**
       * 将编号插入到所有道岔编号的数组中
       */

      turnoutNumbers.push(number);
      /**
       * 将文字颜色信号插入到所有道岔颜色信号的数组中
       */

      turnoutSignals.push(mark);
    }
  }

  const $originalMapPaper = this.layers.get("station_original_map");
  const $paper = this.layers.get("turnouts_signal_color");
  /**
   * 清空画布中原有文本
   */

  $paper.selectAll("text").remove();
  $originalMapPaper.selectAll("text").each(function () {
    const $text = d3.select(this);
    const textString = $text.text();
    const index = turnoutNumbers.indexOf(textString);
    $text.attr("fill", "none");
    let signal;

    if (index > -1) {
      signal = turnoutSignals[index];
    }
    /**
     * 根据颜色信号改变 text 元素样式
     * 首先克隆 text 元素节点
     */


    const $textClone = $text.clone(true);
    /**
     * 将 text 元素的克隆节点插入到轨道层中
     */

    $paper.node().appendChild($textClone.node());

    switch (signal) {
      case "D":
        $textClone.attr("fill", "#7CFC00");
        break;

      case "F":
        $textClone.attr("fill", "yellow");
        break;

      default:
        $textClone.attr("fill", "#fff");
        break;
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Station);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateUID": () => (/* binding */ generateUID),
/* harmony export */   "initStationFromSVG": () => (/* binding */ initStationFromSVG)
/* harmony export */ });
/* harmony import */ var _Station__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Station */ "./src/Station.js");

/**
 * 解析 SVG 代码初始化车站
 * @param {string} svgstr - SVG 字符串
 * @param {DOM} ele 原生DOM对象 用于包裹全部内容
 */

function initStationFromSVG(svgstr, ele) {
  const $ele = d3.select(ele);
  $ele.html(svgstr);
  const $svg = $ele.select("svg");
  /**
   * SVG中一些规则的判断
   */

  $svg.attr("viewBox", [0, 0, $svg.attr("width"), $svg.attr("height")]);
  $svg.style("width", "100%").style("height", "100%");
  const station = new _Station__WEBPACK_IMPORTED_MODULE_0__["default"]($svg);
  return station;
}
/**
 * 生成 UID 字符串
 * @returns {string}
 */


function generateUID() {
  return Math.random().toString(32).slice(2, -1);
}



/***/ }),

/***/ "./main.scss":
/*!*******************!*\
  !*** ./main.scss ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initStationFromSVG": () => (/* reexport safe */ _src_utils__WEBPACK_IMPORTED_MODULE_1__.initStationFromSVG)
/* harmony export */ });
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./main.scss");
/* harmony import */ var _src_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/utils */ "./src/utils.js");



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=rsm-1.0.0.js.map