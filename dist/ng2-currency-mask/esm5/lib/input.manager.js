var InputManager = /** @class */ (function () {
    function InputManager(htmlInputElement) {
        this.htmlInputElement = htmlInputElement;
    }
    InputManager.prototype.setCursorAt = function (position) {
        if (this.htmlInputElement.setSelectionRange) {
            this.htmlInputElement.focus();
            this.htmlInputElement.setSelectionRange(position, position);
        }
        else if (this.htmlInputElement.createTextRange) {
            var textRange = this.htmlInputElement.createTextRange();
            textRange.collapse(true);
            textRange.moveEnd("character", position);
            textRange.moveStart("character", position);
            textRange.select();
        }
    };
    InputManager.prototype.updateValueAndCursor = function (newRawValue, oldLength, selectionStart) {
        this.rawValue = newRawValue;
        var newLength = newRawValue.length;
        selectionStart = selectionStart - (oldLength - newLength);
        this.setCursorAt(selectionStart);
    };
    Object.defineProperty(InputManager.prototype, "canInputMoreNumbers", {
        get: function () {
            var haventReachedMaxLength = !(this.rawValue.length >= this.htmlInputElement.maxLength && this.htmlInputElement.maxLength >= 0);
            var selectionStart = this.inputSelection.selectionStart;
            var selectionEnd = this.inputSelection.selectionEnd;
            var haveNumberSelected = (selectionStart != selectionEnd && this.htmlInputElement.value.substring(selectionStart, selectionEnd).match(/\d/)) ? true : false;
            var startWithZero = (this.htmlInputElement.value.substring(0, 1) == "0");
            return haventReachedMaxLength || haveNumberSelected || startWithZero;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "inputSelection", {
        get: function () {
            var selectionStart = 0;
            var selectionEnd = 0;
            if (typeof this.htmlInputElement.selectionStart == "number" && typeof this.htmlInputElement.selectionEnd == "number") {
                selectionStart = this.htmlInputElement.selectionStart;
                selectionEnd = this.htmlInputElement.selectionEnd;
            }
            else {
                var range = document.getSelection().anchorNode;
                if (range && range.firstChild == this.htmlInputElement) {
                    var lenght = this.htmlInputElement.value.length;
                    var normalizedValue = this.htmlInputElement.value.replace(/\r\n/g, "\n");
                    var startRange = this.htmlInputElement.createTextRange();
                    var endRange = this.htmlInputElement.createTextRange();
                    endRange.collapse(false);
                    if (startRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        selectionStart = selectionEnd = lenght;
                    }
                    else {
                        selectionStart = -startRange.moveStart("character", -lenght);
                        selectionStart += normalizedValue.slice(0, selectionStart).split("\n").length - 1;
                        if (startRange.compareEndPoints("EndToEnd", endRange) > -1) {
                            selectionEnd = lenght;
                        }
                        else {
                            selectionEnd = -startRange.moveEnd("character", -lenght);
                            selectionEnd += normalizedValue.slice(0, selectionEnd).split("\n").length - 1;
                        }
                    }
                }
            }
            return {
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "rawValue", {
        get: function () {
            return this.htmlInputElement && this.htmlInputElement.value;
        },
        set: function (value) {
            this._storedRawValue = value;
            if (this.htmlInputElement) {
                this.htmlInputElement.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputManager.prototype, "storedRawValue", {
        get: function () {
            return this._storedRawValue;
        },
        enumerable: true,
        configurable: true
    });
    return InputManager;
}());
export { InputManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jdXJyZW5jeS1tYXNrLyIsInNvdXJjZXMiOlsibGliL2lucHV0Lm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFJSSxzQkFBb0IsZ0JBQXFCO1FBQXJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBSztJQUN6QyxDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLFFBQWdCO1FBQ3hCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1lBQzlDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4RCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCwyQ0FBb0IsR0FBcEIsVUFBcUIsV0FBbUIsRUFBRSxTQUFpQixFQUFFLGNBQXNCO1FBQy9FLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDbkMsY0FBYyxHQUFHLGNBQWMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxD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RyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3pELFlBQVksSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt5QkFDakY7cUJBQ0o7aUJBQ0o7YUFDSjtZQUVELE9BQU87Z0JBQ0gsY0FBYyxFQUFFLGNBQWM7Z0JBQzlCLFlBQVksRUFBRSxZQUFZO2FBQzdCLENBQUM7UUFDTixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtDQUFRO2FBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ2hFLENBQUM7YUFFRCxVQUFhLEtBQWE7WUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFFN0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3ZDO1FBQ0wsQ0FBQzs7O09BUkE7SUFVRCxzQkFBSSx3Q0FBYzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQTFGRCxJQTBGQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBJbnB1dE1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgX3N0b3JlZFJhd1ZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodG1sSW5wdXRFbGVtZW50OiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJzb3JBdChwb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaHRtbElucHV0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLmh0bWxJbnB1dEVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5odG1sSW5wdXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHBvc2l0aW9uLCBwb3NpdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmh0bWxJbnB1dEVsZW1lbnQuY3JlYXRlVGV4dFJhbmdlKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0UmFuZ2UgPSB0aGlzLmh0bWxJbnB1dEVsZW1lbnQuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgICAgIHRleHRSYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgICAgICAgICAgdGV4dFJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGV4dFJhbmdlLnNlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWYWx1ZUFuZEN1cnNvcihuZXdSYXdWYWx1ZTogc3RyaW5nLCBvbGRMZW5ndGg6IG51bWJlciwgc2VsZWN0aW9uU3RhcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmF3VmFsdWUgPSBuZXdSYXdWYWx1ZTtcclxuICAgICAgICBsZXQgbmV3TGVuZ3RoID0gbmV3UmF3VmFsdWUubGVuZ3RoO1xyXG4gICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQgLSAob2xkTGVuZ3RoIC0gbmV3TGVuZ3RoKTtcclxuICAgICAgICB0aGlzLnNldEN1cnNvckF0KHNlbGVjdGlvblN0YXJ0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FuSW5wdXRNb3JlTnVtYmVycygpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaGF2ZW50UmVhY2hlZE1heExlbmd0aCA9ICEodGhpcy5yYXdWYWx1ZS5sZW5ndGggPj0gdGhpcy5odG1sSW5wdXRFbGVtZW50Lm1heExlbmd0aCAmJiB0aGlzLmh0bWxJbnB1dEVsZW1lbnQubWF4TGVuZ3RoID49IDApO1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25TdGFydCA9IHRoaXMuaW5wdXRTZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbkVuZCA9IHRoaXMuaW5wdXRTZWxlY3Rpb24uc2VsZWN0aW9uRW5kO1xyXG4gICAgICAgIGxldCBoYXZlTnVtYmVyU2VsZWN0ZWQgPSAoc2VsZWN0aW9uU3RhcnQgIT0gc2VsZWN0aW9uRW5kICYmIHRoaXMuaHRtbElucHV0RWxlbWVudC52YWx1ZS5zdWJzdHJpbmcoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkubWF0Y2goL1xcZC8pKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICBsZXQgc3RhcnRXaXRoWmVybyA9ICh0aGlzLmh0bWxJbnB1dEVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIDEpID09IFwiMFwiKTtcclxuICAgICAgICByZXR1cm4gaGF2ZW50UmVhY2hlZE1heExlbmd0aCB8fCBoYXZlTnVtYmVyU2VsZWN0ZWQgfHwgc3RhcnRXaXRoWmVybztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW5wdXRTZWxlY3Rpb24oKTogYW55IHtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSAwO1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25FbmQgPSAwO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuaHRtbElucHV0RWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PSBcIm51bWJlclwiICYmIHR5cGVvZiB0aGlzLmh0bWxJbnB1dEVsZW1lbnQuc2VsZWN0aW9uRW5kID09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLmh0bWxJbnB1dEVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHRoaXMuaHRtbElucHV0RWxlbWVudC5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJhbmdlID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiByYW5nZS5maXJzdENoaWxkID09IHRoaXMuaHRtbElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbmdodCA9IHRoaXMuaHRtbElucHV0RWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9ybWFsaXplZFZhbHVlID0gdGhpcy5odG1sSW5wdXRFbGVtZW50LnZhbHVlLnJlcGxhY2UoL1xcclxcbi9nLCBcIlxcblwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydFJhbmdlID0gdGhpcy5odG1sSW5wdXRFbGVtZW50LmNyZWF0ZVRleHRSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFJhbmdlID0gdGhpcy5odG1sSW5wdXRFbGVtZW50LmNyZWF0ZVRleHRSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgZW5kUmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGFydFJhbmdlLmNvbXBhcmVFbmRQb2ludHMoXCJTdGFydFRvRW5kXCIsIGVuZFJhbmdlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25FbmQgPSBsZW5naHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gLXN0YXJ0UmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC1sZW5naHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ICs9IG5vcm1hbGl6ZWRWYWx1ZS5zbGljZSgwLCBzZWxlY3Rpb25TdGFydCkuc3BsaXQoXCJcXG5cIikubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0UmFuZ2UuY29tcGFyZUVuZFBvaW50cyhcIkVuZFRvRW5kXCIsIGVuZFJhbmdlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IGxlbmdodDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSAtc3RhcnRSYW5nZS5tb3ZlRW5kKFwiY2hhcmFjdGVyXCIsIC1sZW5naHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQgKz0gbm9ybWFsaXplZFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvbkVuZCkuc3BsaXQoXCJcXG5cIikubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0OiBzZWxlY3Rpb25TdGFydCxcclxuICAgICAgICAgICAgc2VsZWN0aW9uRW5kOiBzZWxlY3Rpb25FbmRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByYXdWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxJbnB1dEVsZW1lbnQgJiYgdGhpcy5odG1sSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCByYXdWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fc3RvcmVkUmF3VmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaHRtbElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmh0bWxJbnB1dEVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0b3JlZFJhd1ZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlZFJhd1ZhbHVlO1xyXG4gICAgfVxyXG59Il19