/*
 * Kazakh Chars Reshaper v1.0
 * Create and debugging by mauleta
 * E-mail: ErbosynNurbol@gmail.com 
 * https://github.com/mauleta/KazakhCharsReshaper/
 * Example:http://www.basbet.com/pskz
 * Tested in IE6+, Chrome, Firefox.
 * Copyright 2016 kazakhsoft.com
 */
(function ($) {
    var arb_kz_json = {
        '\u0627': { "3": "\uFE8E", "4": "\uFE8D" }, '\u0628': { "1": "\uFE91", "2": "\uFE92", "3": "\uFE90", "4": "\uFE8F" }, '\u06C6': { "3": "\uFBDA", "4": "\uFBD9" },
        '\u06AF': { "1": "\uFB94", "2": "\uFB95", "3": "\uFB93", "4": "\uFB92" }, '\u0639': { "1": "\uFECB", "2": "\uFECC", "3": "\uFECA", "4": "\uFEC9" },
        '\u062F': { "3": "\uFEAA", "4": "\uFEA9" }, '\u06D5': { "3": "\uFEEA", "4": "\uFEE9" }, '\u062C': { "1": "\uFE9F", "2": "\uFEA0", "3": "\uFE9E", "4": "\uFE9D" },
        '\u0632': { "3": "\uFEB0", "4": "\uFEAF" }, '\u064A': { "1": "\uFEF3", "2": "\uFEF4", "3": "\uFEF2", "4": "\uFEF1" }, '\u0643': { "1": "\uFEDB", "2": "\uFEDC", "3": "\uFEDA", "4": "\uFED9" },
        '\u0642': { "1": "\uFED7", "2": "\uFED8", "3": "\uFED6", "4": "\uFED5" }, '\u0644': { "1": "\uFEDF", "2": "\uFEE0", "3": "\uFEDE", "4": "\uFEDD" },
        '\u0645': { "1": "\uFEE3", "2": "\uFEE4", "3": "\uFEE2", "4": "\uFEE1" }, '\u0646': { "1": "\uFEE7", "2": "\uFEE8", "3": "\uFEE6", "4": "\uFEE5" },
        '\u06AD': { "1": "\uFBD5", "2": "\uFBD6", "3": "\uFBD4", "4": "\uFBD3" }, '\u0648': { "3": "\uFEEE", "4": "\uFEED" }, '\u067E': { "1": "\uFB58", "2": "\uFB59", "3": "\uFB57", "4": "\uFB56" },
        '\u0631': { "3": "\uFEAE", "4": "\uFEAD" }, '\u0633': { "1": "\uFEB3", "2": "\uFEB4", "3": "\uFEB2", "4": "\uFEB1" }, '\u062A': { "1": "\uFE97", "2": "\uFE98", "3": "\uFE96", "4": "\uFE95" },
        '\u06CB': { "3": "\uFBDF", "4": "\uFBDE" }, '\u06C7': { "3": "\uFBD8", "4": "\uFBD7" }, '\u0641': { "1": "\uFED3", "2": "\uFED4", "3": "\uFED2", "4": "\uFED1" },
        '\u062D': { "1": "\uFEA3", "2": "\uFEA4", "3": "\uFEA2", "4": "\uFEA1" }, '\u0686': { "1": "\uFB7C", "2": "\uFB7D", "3": "\uFB7B", "4": "\uFB7A" }, '\u0634': { "1": "\uFEB7", "2": "\uFEB8", "3": "\uFEB6", "4": "\uFEB5" },
        '\u0649': { "1": "\uFBE8", "2": "\uFBE9", "3": "\uFEF0", "4": "\uFEEF" }, '\u0621': { "4": "\uFE80" }, '\u06BE': { "1": "\uFBAC" },
    }
    var jointCharArray = new Array("\uFEFB", "\uFEFC");

    function traversalElementAttr(element, attr) {
        if (attr instanceof Array) {
            for (var i = 0; i < attr.length; i++) {
                traversalElementAttr(element, attr[i]);
            }
        } else {
            var attrValue = element.getAttribute(attr);

            if (attrValue !== "" && attrValue !== null) {
                element.setAttribute(attr, reshaperKzChars(attrValue));
            }
        }
    }

    function traversalElement(element) {
        if (element.nodeType !== 1) {
            return;
        }
        var childNodes = element.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            var childNode = childNodes.item(i);
            // HTML Element
            if (childNode.nodeType === 1) {
                // continue element
                if ("|BR|HR|TEXTAREA|SCRIPT|OBJECT|EMBED|".indexOf("|" + childNode.tagName + "|") !== -1) {
                    continue;
                }
                traversalElementAttr(childNode, ['title', 'data-original-title', 'alt', 'placeholder']);
                // input 
                if (childNode.tagName === "INPUT" &&
                    childNode.value !== "" &&
                    childNode.type !== "text" &&
                    childNode.type !== "hidden") {
                    childNode.value = reshaperKzChars(childNode.value);
                }
                traversalElement(childNode);
            } else if (childNode.nodeType === 3) {  // text node
                childNode.data = reshaperKzChars(childNode.data);
            }
        }
    }

    function reshaperWebKzChars() {
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
            if (window.location.href.indexOf("?mobile") < 0) {
                try {
                    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                        $.each($("body"), function () {
                            traversalElement(this);
                        });
                    }
                } catch (e) { }
            }
        }
    }

    function getArbKzJsonIndex(prevEnd, prev, current) {
        if (!prev || !arb_kz_json.hasOwnProperty(prev)) {
            return 0; //prev not kz char
        }
        if (!current || !arb_kz_json.hasOwnProperty(current)) { //current not kz char
            if (arb_kz_json[prev].hasOwnProperty("3") && !prevEnd) {
                return 3;
            } else {
                return 4;
            }
        }
        if (prevEnd) { // if end
            if (arb_kz_json[prev].hasOwnProperty("1") && (arb_kz_json[current].hasOwnProperty("2") || arb_kz_json[current].hasOwnProperty("3"))) {
                return 1;
            } else {
                return 4;
            }
        } else {
            if (arb_kz_json[prev].hasOwnProperty("2") && (arb_kz_json[current].hasOwnProperty("2") || arb_kz_json[current].hasOwnProperty("3"))) {
                return 2;
            } else if (arb_kz_json[prev].hasOwnProperty("3")) {
                return 3;
            }
        }
    }
    function getJointCharIndex(prevEnd, prev, current) {
        if (!prev || !current) return -1;
        if (prev == "\u0644" && current == "\u0627") {
            if (prevEnd) {
                return 0;
            } else {
                return 1;
            }
        }
        return -1;
    }
    function disReshaperKzChars(string) {
        var result = "";
        for (var i = 0; i < string.length; i++) {
            if (string.charAt(i) == "\u2E2E") { result += "\u061F"; continue; }
            if (string.charAt(i) == "\u2E32") { result += "\u060C"; continue; }
            if (string.charAt(i) == "\u2E35") { result += "\u061B"; continue; }
            if (string.charAt(i) == "\u002D") { result += "\u0640"; continue; }
            if (string.charAt(i) == "\uFBAC") { result += "\u06BE"; continue; }
            if (string.charAt(i) == "\uFEFB" || string.charAt(i) == "\uFEFC")
            {
                result += "\u0644" + "\u0627";
                continue;
            }
            var isKz = false;
            for (var item in arb_kz_json) {
                for (var o in arb_kz_json[item]) {
                    if (arb_kz_json[item][o] == string.charAt(i)) {
                        result += item;
                        isKz = true;
                        break;
                    }
                }
                if (isKz) break;
            }
            if (!isKz) result += string.charAt(i);
        }
        return result;
    }
    function reshaperKzChars(string) {
        var index = 0,
         length = string.length,
         prev = string.charAt(index++),//prev char
         prevEnd = true, // prev is end (default is end)
         result = "";
        for (; index <= length; index++) {
            var current = index != length ? string.charAt(index) : undefined; // current char
            if (prev == "\u061F") { result += "\u2E2E"; prev = current; prevEnd = true; continue; }
            if (prev == "\u060C") { result += "\u2E32"; prev = current; prevEnd = true; continue; }
            if (prev == "\u061B") { result += "\u2E35"; prev = current; prevEnd = true; continue; }
            if (prev == "\u0640") { result += "\u002D"; prev = current; prevEnd = true; continue; }
            if (prev == "\u066A") { result += "\u0025"; prev = current; prevEnd = true; continue;}
            if (prev == "\u06BE") { result += "\uFBAC"; prev = current; prevEnd = false; continue; }
            var jointCharIndex = getJointCharIndex(prevEnd, prev, current)
            if (jointCharIndex != -1) {
                result += jointCharArray[jointCharIndex];
                if (index == length - 1) {
                    break;
                } else {
                    prevEnd = true;
                    prev = string.charAt(++index);
                    continue;
                }
            }
            charIndex = getArbKzJsonIndex(prevEnd, prev, current);
            result += (charIndex == 0 ? prev : arb_kz_json[prev][charIndex]);
            prevEnd = ((charIndex === 1 || charIndex === 2) ? false : true);
            prev = current;
        }
        return result;
    }
    $.extend({
        reshaperKzChars: function (str) {
            return reshaperKzChars(str);
        },
        disReshaperKzChars:function(str){
            return disReshaperKzChars(str);
        },
        reshaperWebKzChars: function () {
            return reshaperWebKzChars();
        }
    });
    $.fn.extend({
        reshaperKzChars: function (str) {
            return reshaperKzChars(str);
        },
        disReshaperKzChars: function (str) {
            return disReshaperKzChars(str);
        },
        reshaperWebKzChars: function () {
            return reshaperWebKzChars();
        }
    });
})(jQuery);
