import { InputManager } from "./input.manager";
var InputService = /** @class */ (function () {
    function InputService(htmlInputElement, options) {
        this.htmlInputElement = htmlInputElement;
        this.options = options;
        this.inputManager = new InputManager(htmlInputElement);
    }
    InputService.prototype.addNumber = function (keyCode) {
        if (!this.rawValue) {
            this.rawValue = this.applyMask(false, "0");
        }
        var keyChar = String.fromCharCode(keyCode);
        var selectionStart = this.inputSelection.selectionStart;
        var selectionEnd = this.inputSelection.selectionEnd;
        this.rawValue = this.rawValue.substring(0, selectionStart) + keyChar + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart + 1);
    };
    InputService.prototype.applyMask = function (isNumber, rawValue) {
        var _a = this.options, allowNegative = _a.allowNegative, decimal = _a.decimal, precision = _a.precision, prefix = _a.prefix, suffix = _a.suffix, thousands = _a.thousands;
        rawValue = isNumber ? new Number(rawValue).toFixed(precision) : rawValue;
        var onlyNumbers = rawValue.replace(/[^0-9]/g, "");
        if (!onlyNumbers) {
            return "";
        }
        var integerPart = onlyNumbers.slice(0, onlyNumbers.length - precision).replace(/^0*/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
        if (integerPart == "") {
            integerPart = "0";
        }
        var newRawValue = integerPart;
        var decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);
        if (precision > 0) {
            decimalPart = "0".repeat(precision - decimalPart.length) + decimalPart;
            newRawValue += decimal + decimalPart;
        }
        var isZero = parseInt(integerPart) == 0 && (parseInt(decimalPart) == 0 || decimalPart == "");
        var operator = (rawValue.indexOf("-") > -1 && allowNegative && !isZero) ? "-" : "";
        return operator + prefix + newRawValue + suffix;
    };
    InputService.prototype.clearMask = function (rawValue) {
        if (rawValue == null || rawValue == "") {
            return null;
        }
        var value = rawValue.replace(this.options.prefix, "").replace(this.options.suffix, "");
        if (this.options.thousands) {
            value = value.replace(new RegExp("\\" + this.options.thousands, "g"), "");
        }
        if (this.options.decimal) {
            value = value.replace(this.options.decimal, ".");
        }
        return parseFloat(value);
    };
    InputService.prototype.changeToNegative = function () {
        if (this.options.allowNegative && this.rawValue != "" && this.rawValue.charAt(0) != "-" && this.value != 0) {
            var selectionStart = this.inputSelection.selectionStart;
            this.rawValue = "-" + this.rawValue;
            this.updateFieldValue(selectionStart + 1);
        }
    };
    InputService.prototype.changeToPositive = function () {
        var selectionStart = this.inputSelection.selectionStart;
        this.rawValue = this.rawValue.replace("-", "");
        this.updateFieldValue(selectionStart - 1);
    };
    InputService.prototype.fixCursorPosition = function (forceToEndPosition) {
        var currentCursorPosition = this.inputSelection.selectionStart;
        //if the current cursor position is after the number end position, it is moved to the end of the number, ignoring the prefix or suffix. this behavior can be forced with forceToEndPosition flag
        if (currentCursorPosition > this.getRawValueWithoutSuffixEndPosition() || forceToEndPosition) {
            this.inputManager.setCursorAt(this.getRawValueWithoutSuffixEndPosition());
            //if the current cursor position is before the number start position, it is moved to the start of the number, ignoring the prefix or suffix
        }
        else if (currentCursorPosition < this.getRawValueWithoutPrefixStartPosition()) {
            this.inputManager.setCursorAt(this.getRawValueWithoutPrefixStartPosition());
        }
    };
    InputService.prototype.getRawValueWithoutSuffixEndPosition = function () {
        return this.rawValue.length - this.options.suffix.length;
    };
    InputService.prototype.getRawValueWithoutPrefixStartPosition = function () {
        return this.value != null && this.value < 0 ? this.options.prefix.length + 1 : this.options.prefix.length;
    };
    InputService.prototype.removeNumber = function (keyCode) {
        var _a = this.options, decimal = _a.decimal, thousands = _a.thousands;
        var selectionEnd = this.inputSelection.selectionEnd;
        var selectionStart = this.inputSelection.selectionStart;
        if (selectionStart > this.rawValue.length - this.options.suffix.length) {
            selectionEnd = this.rawValue.length - this.options.suffix.length;
            selectionStart = this.rawValue.length - this.options.suffix.length;
        }
        //there is no selection
        if (selectionEnd == selectionStart) {
            //delete key and the target digit is a number
            if ((keyCode == 46 || keyCode == 63272) && /^\d+$/.test(this.rawValue.substring(selectionStart, selectionEnd + 1))) {
                selectionEnd = selectionEnd + 1;
            }
            //delete key and the target digit is the decimal or thousands divider
            if ((keyCode == 46 || keyCode == 63272) && (this.rawValue.substring(selectionStart, selectionEnd + 1) == decimal || this.rawValue.substring(selectionStart, selectionEnd + 1) == thousands)) {
                selectionEnd = selectionEnd + 2;
                selectionStart = selectionStart + 1;
            }
            //backspace key and the target digit is a number
            if (keyCode == 8 && /^\d+$/.test(this.rawValue.substring(selectionStart - 1, selectionEnd))) {
                selectionStart = selectionStart - 1;
            }
            //backspace key and the target digit is the decimal or thousands divider
            if (keyCode == 8 && (this.rawValue.substring(selectionStart - 1, selectionEnd) == decimal || this.rawValue.substring(selectionStart - 1, selectionEnd) == thousands)) {
                selectionStart = selectionStart - 2;
                selectionEnd = selectionEnd - 1;
            }
        }
        this.rawValue = this.rawValue.substring(0, selectionStart) + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart);
    };
    InputService.prototype.updateFieldValue = function (selectionStart) {
        var newRawValue = this.applyMask(false, this.rawValue || "");
        selectionStart = selectionStart == undefined ? this.rawValue.length : selectionStart;
        this.inputManager.updateValueAndCursor(newRawValue, this.rawValue.length, selectionStart);
    };
    InputService.prototype.updateOptions = function (options) {
        var value = this.value;
        this.options = options;
        this.value = value;
    };
    Object.defineProperty(InputService.prototype, "canInputMoreNumbers", {
        get: function () {
            return this.inputManager.canInputMoreNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "inputSelection", {
        get: function () {
            return this.inputManager.inputSelection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "rawValue", {
        get: function () {
            return this.inputManager.rawValue;
        },
        set: function (value) {
            this.inputManager.rawValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "storedRawValue", {
        get: function () {
            return this.inputManager.storedRawValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputService.prototype, "value", {
        get: function () {
            return this.clearMask(this.rawValue);
        },
        set: function (value) {
            this.rawValue = this.applyMask(true, "" + value);
        },
        enumerable: true,
        configurable: true
    });
    return InputService;
}());
export { InputService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jdXJyZW5jeS1tYXNrLyIsInNvdXJjZXMiOlsibGliL2lucHV0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DO0lBSUksc0JBQW9CLGdCQUFxQixFQUFVLE9BQVk7UUFBM0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFLO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxPQUFlO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQ3hELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxnQ0FBUyxHQUFULFVBQVUsUUFBaUIsRUFBRSxRQUFn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USxHQUFHLEtBQUssQ0FBQztRQUN2QyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLHdDQUFjO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtCQUFLO2FBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7YUFFRCxVQUFVLEtBQWE7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BSkE7SUFLTCxtQkFBQztBQUFELENBQUMsQUFsTEQsSUFrTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dE1hbmFnZXIgfSBmcm9tIFwiLi9pbnB1dC5tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0TWFuYWdlcjogSW5wdXRNYW5hZ2VyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHRtbElucHV0RWxlbWVudDogYW55LCBwcml2YXRlIG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRNYW5hZ2VyID0gbmV3IElucHV0TWFuYWdlcihodG1sSW5wdXRFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGROdW1iZXIoa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJhd1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmF3VmFsdWUgPSB0aGlzLmFwcGx5TWFzayhmYWxzZSwgXCIwXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGtleUNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleUNvZGUpO1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuaW5wdXRTZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbkVuZCA9IHRoaXMuaW5wdXRTZWxlY3Rpb24uc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgIHRoaXMucmF3VmFsdWUgPSB0aGlzLnJhd1ZhbHVlLnN1YnN0cmluZygwLCBzZWxlY3Rpb25TdGFydCkgKyBrZXlDaGFyICsgdGhpcy5yYXdWYWx1ZS5zdWJzdHJpbmcoc2VsZWN0aW9uRW5kLCB0aGlzLnJhd1ZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWVsZFZhbHVlKHNlbGVjdGlvblN0YXJ0ICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlNYXNrKGlzTnVtYmVyOiBib29sZWFuLCByYXdWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgeyBhbGxvd05lZ2F0aXZlLCBkZWNpbWFsLCBwcmVjaXNpb24sIHByZWZpeCwgc3VmZml4LCB0aG91c2FuZHMgfSA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICByYXdWYWx1ZSA9IGlzTnVtYmVyID8gbmV3IE51bWJlcihyYXdWYWx1ZSkudG9GaXhlZChwcmVjaXNpb24pIDogcmF3VmFsdWU7XHJcbiAgICAgICAgbGV0IG9ubHlOdW1iZXJzID0gcmF3VmFsdWUucmVwbGFjZSgvW14wLTldL2csIFwiXCIpO1xyXG5cclxuICAgICAgICBpZiAoIW9ubHlOdW1iZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGludGVnZXJQYXJ0ID0gb25seU51bWJlcnMuc2xpY2UoMCwgb25seU51bWJlcnMubGVuZ3RoIC0gcHJlY2lzaW9uKS5yZXBsYWNlKC9eMCovZywgXCJcIikucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgdGhvdXNhbmRzKTtcclxuXHJcbiAgICAgICAgaWYgKGludGVnZXJQYXJ0ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgaW50ZWdlclBhcnQgPSBcIjBcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdSYXdWYWx1ZSA9IGludGVnZXJQYXJ0O1xyXG4gICAgICAgIGxldCBkZWNpbWFsUGFydCA9IG9ubHlOdW1iZXJzLnNsaWNlKG9ubHlOdW1iZXJzLmxlbmd0aCAtIHByZWNpc2lvbik7XHJcblxyXG4gICAgICAgIGlmIChwcmVjaXNpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIGRlY2ltYWxQYXJ0ID0gXCIwXCIucmVwZWF0KHByZWNpc2lvbiAtIGRlY2ltYWxQYXJ0Lmxlbmd0aCkgKyBkZWNpbWFsUGFydDtcclxuICAgICAgICAgICAgbmV3UmF3VmFsdWUgKz0gZGVjaW1hbCArIGRlY2ltYWxQYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlzWmVybyA9IHBhcnNlSW50KGludGVnZXJQYXJ0KSA9PSAwICYmIChwYXJzZUludChkZWNpbWFsUGFydCkgPT0gMCB8fCBkZWNpbWFsUGFydCA9PSBcIlwiKTtcclxuICAgICAgICBsZXQgb3BlcmF0b3IgPSAocmF3VmFsdWUuaW5kZXhPZihcIi1cIikgPiAtMSAmJiBhbGxvd05lZ2F0aXZlICYmICFpc1plcm8pID8gXCItXCIgOiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBvcGVyYXRvciArIHByZWZpeCArIG5ld1Jhd1ZhbHVlICsgc3VmZml4O1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyTWFzayhyYXdWYWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAocmF3VmFsdWUgPT0gbnVsbCB8fCByYXdWYWx1ZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHZhbHVlID0gcmF3VmFsdWUucmVwbGFjZSh0aGlzLm9wdGlvbnMucHJlZml4LCBcIlwiKS5yZXBsYWNlKHRoaXMub3B0aW9ucy5zdWZmaXgsIFwiXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFxcIiArIHRoaXMub3B0aW9ucy50aG91c2FuZHMsIFwiZ1wiKSwgXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRlY2ltYWwpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHRoaXMub3B0aW9ucy5kZWNpbWFsLCBcIi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVG9OZWdhdGl2ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93TmVnYXRpdmUgJiYgdGhpcy5yYXdWYWx1ZSAhPSBcIlwiICYmIHRoaXMucmF3VmFsdWUuY2hhckF0KDApICE9IFwiLVwiICYmIHRoaXMudmFsdWUgIT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmlucHV0U2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgICAgICB0aGlzLnJhd1ZhbHVlID0gXCItXCIgKyB0aGlzLnJhd1ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpZWxkVmFsdWUoc2VsZWN0aW9uU3RhcnQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVG9Qb3NpdGl2ZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmlucHV0U2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0O1xyXG4gICAgICAgIHRoaXMucmF3VmFsdWUgPSB0aGlzLnJhd1ZhbHVlLnJlcGxhY2UoXCItXCIsIFwiXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmllbGRWYWx1ZShzZWxlY3Rpb25TdGFydCAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpeEN1cnNvclBvc2l0aW9uKGZvcmNlVG9FbmRQb3NpdGlvbj86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgY3VycmVudEN1cnNvclBvc2l0aW9uID0gdGhpcy5pbnB1dFNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgLy9pZiB0aGUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24gaXMgYWZ0ZXIgdGhlIG51bWJlciBlbmQgcG9zaXRpb24sIGl0IGlzIG1vdmVkIHRvIHRoZSBlbmQgb2YgdGhlIG51bWJlciwgaWdub3JpbmcgdGhlIHByZWZpeCBvciBzdWZmaXguIHRoaXMgYmVoYXZpb3IgY2FuIGJlIGZvcmNlZCB3aXRoIGZvcmNlVG9FbmRQb3NpdGlvbiBmbGFnXHJcbiAgICAgICAgaWYgKGN1cnJlbnRDdXJzb3JQb3NpdGlvbiA+IHRoaXMuZ2V0UmF3VmFsdWVXaXRob3V0U3VmZml4RW5kUG9zaXRpb24oKSB8fCBmb3JjZVRvRW5kUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hbmFnZXIuc2V0Q3Vyc29yQXQodGhpcy5nZXRSYXdWYWx1ZVdpdGhvdXRTdWZmaXhFbmRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy9pZiB0aGUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24gaXMgYmVmb3JlIHRoZSBudW1iZXIgc3RhcnQgcG9zaXRpb24sIGl0IGlzIG1vdmVkIHRvIHRoZSBzdGFydCBvZiB0aGUgbnVtYmVyLCBpZ25vcmluZyB0aGUgcHJlZml4IG9yIHN1ZmZpeFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEN1cnNvclBvc2l0aW9uIDwgdGhpcy5nZXRSYXdWYWx1ZVdpdGhvdXRQcmVmaXhTdGFydFBvc2l0aW9uKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hbmFnZXIuc2V0Q3Vyc29yQXQodGhpcy5nZXRSYXdWYWx1ZVdpdGhvdXRQcmVmaXhTdGFydFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRSYXdWYWx1ZVdpdGhvdXRTdWZmaXhFbmRQb3NpdGlvbigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhd1ZhbHVlLmxlbmd0aCAtIHRoaXMub3B0aW9ucy5zdWZmaXgubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhd1ZhbHVlV2l0aG91dFByZWZpeFN0YXJ0UG9zaXRpb24oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAhPSBudWxsICYmIHRoaXMudmFsdWUgPCAwID8gdGhpcy5vcHRpb25zLnByZWZpeC5sZW5ndGggKyAxIDogdGhpcy5vcHRpb25zLnByZWZpeC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlTnVtYmVyKGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCB7IGRlY2ltYWwsIHRob3VzYW5kcyB9ID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25FbmQgPSB0aGlzLmlucHV0U2VsZWN0aW9uLnNlbGVjdGlvbkVuZDtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmlucHV0U2VsZWN0aW9uLnNlbGVjdGlvblN0YXJ0O1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgPiB0aGlzLnJhd1ZhbHVlLmxlbmd0aCAtIHRoaXMub3B0aW9ucy5zdWZmaXgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHRoaXMucmF3VmFsdWUubGVuZ3RoIC0gdGhpcy5vcHRpb25zLnN1ZmZpeC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5yYXdWYWx1ZS5sZW5ndGggLSB0aGlzLm9wdGlvbnMuc3VmZml4Lmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdGhlcmUgaXMgbm8gc2VsZWN0aW9uXHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbkVuZCA9PSBzZWxlY3Rpb25TdGFydCkge1xyXG4gICAgICAgICAgICAvL2RlbGV0ZSBrZXkgYW5kIHRoZSB0YXJnZXQgZGlnaXQgaXMgYSBudW1iZXJcclxuICAgICAgICAgICAgaWYgKChrZXlDb2RlID09IDQ2IHx8IGtleUNvZGUgPT0gNjMyNzIpICYmIC9eXFxkKyQvLnRlc3QodGhpcy5yYXdWYWx1ZS5zdWJzdHJpbmcoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCArIDEpKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9kZWxldGUga2V5IGFuZCB0aGUgdGFyZ2V0IGRpZ2l0IGlzIHRoZSBkZWNpbWFsIG9yIHRob3VzYW5kcyBkaXZpZGVyXHJcbiAgICAgICAgICAgIGlmICgoa2V5Q29kZSA9PSA0NiB8fCBrZXlDb2RlID09IDYzMjcyKSAmJiAodGhpcy5yYXdWYWx1ZS5zdWJzdHJpbmcoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCArIDEpID09IGRlY2ltYWwgfHwgdGhpcy5yYXdWYWx1ZS5zdWJzdHJpbmcoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCArIDEpID09IHRob3VzYW5kcykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZCArIDI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0ICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9iYWNrc3BhY2Uga2V5IGFuZCB0aGUgdGFyZ2V0IGRpZ2l0IGlzIGEgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDggJiYgL15cXGQrJC8udGVzdCh0aGlzLnJhd1ZhbHVlLnN1YnN0cmluZyhzZWxlY3Rpb25TdGFydCAtIDEsIHNlbGVjdGlvbkVuZCkpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9iYWNrc3BhY2Uga2V5IGFuZCB0aGUgdGFyZ2V0IGRpZ2l0IGlzIHRoZSBkZWNpbWFsIG9yIHRob3VzYW5kcyBkaXZpZGVyXHJcbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09IDggJiYgKHRoaXMucmF3VmFsdWUuc3Vic3RyaW5nKHNlbGVjdGlvblN0YXJ0IC0gMSwgc2VsZWN0aW9uRW5kKSA9PSBkZWNpbWFsIHx8IHRoaXMucmF3VmFsdWUuc3Vic3RyaW5nKHNlbGVjdGlvblN0YXJ0IC0gMSwgc2VsZWN0aW9uRW5kKSA9PSB0aG91c2FuZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0IC0gMjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmF3VmFsdWUgPSB0aGlzLnJhd1ZhbHVlLnN1YnN0cmluZygwLCBzZWxlY3Rpb25TdGFydCkgKyB0aGlzLnJhd1ZhbHVlLnN1YnN0cmluZyhzZWxlY3Rpb25FbmQsIHRoaXMucmF3VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpZWxkVmFsdWUoc2VsZWN0aW9uU3RhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUZpZWxkVmFsdWUoc2VsZWN0aW9uU3RhcnQ/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbmV3UmF3VmFsdWUgPSB0aGlzLmFwcGx5TWFzayhmYWxzZSwgdGhpcy5yYXdWYWx1ZSB8fCBcIlwiKTtcclxuICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0ID09IHVuZGVmaW5lZCA/IHRoaXMucmF3VmFsdWUubGVuZ3RoIDogc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgdGhpcy5pbnB1dE1hbmFnZXIudXBkYXRlVmFsdWVBbmRDdXJzb3IobmV3UmF3VmFsdWUsIHRoaXMucmF3VmFsdWUubGVuZ3RoLCBzZWxlY3Rpb25TdGFydCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlT3B0aW9ucyhvcHRpb25zOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhbklucHV0TW9yZU51bWJlcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRNYW5hZ2VyLmNhbklucHV0TW9yZU51bWJlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0U2VsZWN0aW9uKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRNYW5hZ2VyLmlucHV0U2VsZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByYXdWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0TWFuYWdlci5yYXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmF3VmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRNYW5hZ2VyLnJhd1ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0b3JlZFJhd1ZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRNYW5hZ2VyLnN0b3JlZFJhd1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFyTWFzayh0aGlzLnJhd1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmF3VmFsdWUgPSB0aGlzLmFwcGx5TWFzayh0cnVlLCBcIlwiICsgdmFsdWUpO1xyXG4gICAgfVxyXG59Il19