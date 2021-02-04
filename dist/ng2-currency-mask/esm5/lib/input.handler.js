import { InputService } from "./input.service";
var InputHandler = /** @class */ (function () {
    function InputHandler(htmlInputElement, options) {
        this.inputService = new InputService(htmlInputElement, options);
        this.htmlInputElement = htmlInputElement;
    }
    InputHandler.prototype.handleClick = function (event, chromeAndroid) {
        var selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);
        //if there is no selection and the value is not null, the cursor position will be fixed. if the browser is chrome on android, the cursor will go to the end of the number.
        if (selectionRangeLength == 0 && !isNaN(this.inputService.value)) {
            this.inputService.fixCursorPosition(chromeAndroid);
        }
    };
    InputHandler.prototype.handleCut = function (event) {
        var _this = this;
        if (this.isReadOnly()) {
            return;
        }
        setTimeout(function () {
            _this.inputService.updateFieldValue();
            _this.setValue(_this.inputService.value);
            _this.onModelChange(_this.inputService.value);
        }, 0);
    };
    InputHandler.prototype.handleInput = function (event) {
        if (this.isReadOnly()) {
            return;
        }
        var keyCode = this.getNewKeyCode(this.inputService.storedRawValue, this.inputService.rawValue);
        var rawValueLength = this.inputService.rawValue.length;
        var rawValueSelectionEnd = this.inputService.inputSelection.selectionEnd;
        var rawValueWithoutSuffixEndPosition = this.inputService.getRawValueWithoutSuffixEndPosition();
        var storedRawValueLength = this.inputService.storedRawValue.length;
        this.inputService.rawValue = this.inputService.storedRawValue;
        if ((rawValueSelectionEnd != rawValueWithoutSuffixEndPosition || Math.abs(rawValueLength - storedRawValueLength) != 1) && storedRawValueLength != 0) {
            this.setCursorPosition(event);
            return;
        }
        if (rawValueLength < storedRawValueLength) {
            if (this.inputService.value != 0) {
                this.inputService.removeNumber(8);
            }
            else {
                this.setValue(null);
            }
        }
        if (rawValueLength > storedRawValueLength) {
            switch (keyCode) {
                case 43:
                    this.inputService.changeToPositive();
                    break;
                case 45:
                    this.inputService.changeToNegative();
                    break;
                default:
                    if (!this.inputService.canInputMoreNumbers || (isNaN(this.inputService.value) && String.fromCharCode(keyCode).match(/\d/) == null)) {
                        return;
                    }
                    this.inputService.addNumber(keyCode);
            }
        }
        this.setCursorPosition(event);
        this.onModelChange(this.inputService.value);
    };
    InputHandler.prototype.handleKeydown = function (event) {
        if (this.isReadOnly()) {
            return;
        }
        var keyCode = event.which || event.charCode || event.keyCode;
        if (keyCode == 8 || keyCode == 46 || keyCode == 63272) {
            event.preventDefault();
            var selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);
            if (selectionRangeLength == this.inputService.rawValue.length || this.inputService.value == 0) {
                this.setValue(null);
                this.onModelChange(this.inputService.value);
            }
            if (selectionRangeLength == 0 && !isNaN(this.inputService.value)) {
                this.inputService.removeNumber(keyCode);
                this.onModelChange(this.inputService.value);
            }
            if ((keyCode === 8 || keyCode === 46) && selectionRangeLength != 0 && !isNaN(this.inputService.value)) {
                this.inputService.removeNumber(keyCode);
                this.onModelChange(this.inputService.value);
            }
        }
    };
    InputHandler.prototype.handleKeypress = function (event) {
        if (this.isReadOnly()) {
            return;
        }
        var keyCode = event.which || event.charCode || event.keyCode;
        if (keyCode == undefined || [9, 13].indexOf(keyCode) != -1 || this.isArrowEndHomeKeyInFirefox(event)) {
            return;
        }
        switch (keyCode) {
            case 43:
                this.inputService.changeToPositive();
                break;
            case 45:
                this.inputService.changeToNegative();
                break;
            default:
                if (this.inputService.canInputMoreNumbers && (!isNaN(this.inputService.value) || String.fromCharCode(keyCode).match(/\d/) != null)) {
                    this.inputService.addNumber(keyCode);
                }
        }
        event.preventDefault();
        this.onModelChange(this.inputService.value);
    };
    InputHandler.prototype.handleKeyup = function (event) {
        this.inputService.fixCursorPosition();
    };
    InputHandler.prototype.handlePaste = function (event) {
        var _this = this;
        if (this.isReadOnly()) {
            return;
        }
        setTimeout(function () {
            _this.inputService.updateFieldValue();
            _this.setValue(_this.inputService.value);
            _this.onModelChange(_this.inputService.value);
        }, 1);
    };
    InputHandler.prototype.updateOptions = function (options) {
        this.inputService.updateOptions(options);
    };
    InputHandler.prototype.getOnModelChange = function () {
        return this.onModelChange;
    };
    InputHandler.prototype.setOnModelChange = function (callbackFunction) {
        this.onModelChange = callbackFunction;
    };
    InputHandler.prototype.getOnModelTouched = function () {
        return this.onModelTouched;
    };
    InputHandler.prototype.setOnModelTouched = function (callbackFunction) {
        this.onModelTouched = callbackFunction;
    };
    InputHandler.prototype.setValue = function (value) {
        this.inputService.value = value;
    };
    InputHandler.prototype.getNewKeyCode = function (oldString, newString) {
        if (oldString.length > newString.length) {
            return null;
        }
        for (var x = 0; x < newString.length; x++) {
            if (oldString.length == x || oldString[x] != newString[x]) {
                return newString.charCodeAt(x);
            }
        }
    };
    InputHandler.prototype.isArrowEndHomeKeyInFirefox = function (event) {
        if ([35, 36, 37, 38, 39, 40].indexOf(event.keyCode) != -1 && (event.charCode == undefined || event.charCode == 0)) {
            return true;
        }
        return false;
    };
    InputHandler.prototype.isReadOnly = function () {
        return this.htmlInputElement && this.htmlInputElement.readOnly;
    };
    InputHandler.prototype.setCursorPosition = function (event) {
        var rawValueWithoutSuffixEndPosition = this.inputService.getRawValueWithoutSuffixEndPosition();
        setTimeout(function () {
            event.target.setSelectionRange(rawValueWithoutSuffixEndPosition, rawValueWithoutSuffixEndPosition);
        }, 0);
    };
    return InputHandler;
}());
export { InputHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jdXJyZW5jeS1tYXNrLyIsInNvdXJjZXMiOlsibGliL2lucHV0LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DO0lBT0ksc0JBQVksZ0JBQWtDLEVBQUUsT0FBWTtRQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUM3QyxDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLEtBQVUsRUFBRSxhQUFzQjtRQUMxQyxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXJJLDBLQUEwSztRQUMxSyxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLEtBQVU7UUFBcEIsaUJBVUM7UUFURyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFFRCxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDckMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxD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QUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN2RCxPQUFPLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEM7U0FDSjtJQUNMLENBQUM7SUFFTyxpREFBMEIsR0FBbEMsVUFBbUMsS0FBVTtRQUN6QyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUMvRyxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLGlDQUFVLEdBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztJQUNuRSxDQUFDO0lBRU8sd0NBQWlCLEdBQXpCLFVBQTBCLEtBQVU7UUFDaEMsSUFBSSxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1DQUFtQyxFQUFFLENBQUM7UUFFL0YsVUFBVSxDQUFDO1lBQ1AsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3ZHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUE5TUQsSUE4TUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dFNlcnZpY2UgfSBmcm9tIFwiLi9pbnB1dC5zZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRIYW5kbGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0U2VydmljZTogSW5wdXRTZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBodG1sSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGh0bWxJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRTZXJ2aWNlID0gbmV3IElucHV0U2VydmljZShodG1sSW5wdXRFbGVtZW50LCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmh0bWxJbnB1dEVsZW1lbnQgPSBodG1sSW5wdXRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBhbnksIGNocm9tZUFuZHJvaWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uUmFuZ2VMZW5ndGggPSBNYXRoLmFicyh0aGlzLmlucHV0U2VydmljZS5pbnB1dFNlbGVjdGlvbi5zZWxlY3Rpb25FbmQgLSB0aGlzLmlucHV0U2VydmljZS5pbnB1dFNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydCk7XHJcblxyXG4gICAgICAgIC8vaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uIGFuZCB0aGUgdmFsdWUgaXMgbm90IG51bGwsIHRoZSBjdXJzb3IgcG9zaXRpb24gd2lsbCBiZSBmaXhlZC4gaWYgdGhlIGJyb3dzZXIgaXMgY2hyb21lIG9uIGFuZHJvaWQsIHRoZSBjdXJzb3Igd2lsbCBnbyB0byB0aGUgZW5kIG9mIHRoZSBudW1iZXIuXHJcbiAgICAgICAgaWYgKHNlbGVjdGlvblJhbmdlTGVuZ3RoID09IDAgJiYgIWlzTmFOKHRoaXMuaW5wdXRTZXJ2aWNlLnZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0U2VydmljZS5maXhDdXJzb3JQb3NpdGlvbihjaHJvbWVBbmRyb2lkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ3V0KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlYWRPbmx5KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRTZXJ2aWNlLnVwZGF0ZUZpZWxkVmFsdWUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmlucHV0U2VydmljZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmlucHV0U2VydmljZS52YWx1ZSk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVhZE9ubHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5Q29kZSA9IHRoaXMuZ2V0TmV3S2V5Q29kZSh0aGlzLmlucHV0U2VydmljZS5zdG9yZWRSYXdWYWx1ZSwgdGhpcy5pbnB1dFNlcnZpY2UucmF3VmFsdWUpO1xyXG4gICAgICAgIGxldCByYXdWYWx1ZUxlbmd0aCA9IHRoaXMuaW5wdXRTZXJ2aWNlLnJhd1ZhbHVlLmxlbmd0aDtcclxuICAgICAgICBsZXQgcmF3VmFsdWVTZWxlY3Rpb25FbmQgPSB0aGlzLmlucHV0U2VydmljZS5pbnB1dFNlbGVjdGlvbi5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgbGV0IHJhd1ZhbHVlV2l0aG91dFN1ZmZpeEVuZFBvc2l0aW9uID0gdGhpcy5pbnB1dFNlcnZpY2UuZ2V0UmF3VmFsdWVXaXRob3V0U3VmZml4RW5kUG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgc3RvcmVkUmF3VmFsdWVMZW5ndGggPSB0aGlzLmlucHV0U2VydmljZS5zdG9yZWRSYXdWYWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5pbnB1dFNlcnZpY2UucmF3VmFsdWUgPSB0aGlzLmlucHV0U2VydmljZS5zdG9yZWRSYXdWYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKChyYXdWYWx1ZVNlbGVjdGlvbkVuZCAhPSByYXdWYWx1ZVdpdGhvdXRTdWZmaXhFbmRQb3NpdGlvbiB8fCBNYXRoLmFicyhyYXdWYWx1ZUxlbmd0aCAtIHN0b3JlZFJhd1ZhbHVlTGVuZ3RoKSAhPSAxKSAmJiBzdG9yZWRSYXdWYWx1ZUxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24oZXZlbnQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmF3VmFsdWVMZW5ndGggPCBzdG9yZWRSYXdWYWx1ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFNlcnZpY2UudmFsdWUgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFNlcnZpY2UucmVtb3ZlTnVtYmVyKDgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJhd1ZhbHVlTGVuZ3RoID4gc3RvcmVkUmF3VmFsdWVMZW5ndGgpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRTZXJ2aWNlLmNoYW5nZVRvUG9zaXRpdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dFNlcnZpY2UuY2hhbmdlVG9OZWdhdGl2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5wdXRTZXJ2aWNlLmNhbklucHV0TW9yZU51bWJlcnMgfHwgKGlzTmFOKHRoaXMuaW5wdXRTZXJ2aWNlLnZhbHVlKSAmJiBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleUNvZGUpLm1hdGNoKC9cXGQvKSA9PSBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0U2VydmljZS5hZGROdW1iZXIoa2V5Q29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24oZXZlbnQpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmlucHV0U2VydmljZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkT25seSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBrZXlDb2RlID0gZXZlbnQud2hpY2ggfHwgZXZlbnQuY2hhckNvZGUgfHwgZXZlbnQua2V5Q29kZTtcclxuXHJcbiAgICAgICAgaWYgKGtleUNvZGUgPT0gOCB8fCBrZXlDb2RlID09IDQ2IHx8IGtleUNvZGUgPT0gNjMyNzIpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvblJhbmdlTGVuZ3RoID0gTWF0aC5hYnModGhpcy5pbnB1dFNlcnZpY2UuaW5wdXRTZWxlY3Rpb24uc2VsZWN0aW9uRW5kIC0gdGhpcy5pbnB1dFNlcnZpY2UuaW5wdXRTZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvblJhbmdlTGVuZ3RoID09IHRoaXMuaW5wdXRTZXJ2aWNlLnJhd1ZhbHVlLmxlbmd0aCB8fCB0aGlzLmlucHV0U2VydmljZS52YWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuaW5wdXRTZXJ2aWNlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvblJhbmdlTGVuZ3RoID09IDAgJiYgIWlzTmFOKHRoaXMuaW5wdXRTZXJ2aWNlLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFNlcnZpY2UucmVtb3ZlTnVtYmVyKGtleUNvZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuaW5wdXRTZXJ2aWNlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKChrZXlDb2RlID09PSA4IHx8IGtleUNvZGUgPT09IDQ2KSAmJiBzZWxlY3Rpb25SYW5nZUxlbmd0aCAhPSAwICYmICFpc05hTih0aGlzLmlucHV0U2VydmljZS52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRTZXJ2aWNlLnJlbW92ZU51bWJlcihrZXlDb2RlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmlucHV0U2VydmljZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlS2V5cHJlc3MoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVhZE9ubHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQga2V5Q29kZSA9IGV2ZW50LndoaWNoIHx8IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGU7XHJcblxyXG4gICAgICAgIGlmIChrZXlDb2RlID09IHVuZGVmaW5lZCB8fCBbOSwgMTNdLmluZGV4T2Yoa2V5Q29kZSkgIT0gLTEgfHwgdGhpcy5pc0Fycm93RW5kSG9tZUtleUluRmlyZWZveChldmVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgNDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0U2VydmljZS5jaGFuZ2VUb1Bvc2l0aXZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0NTpcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRTZXJ2aWNlLmNoYW5nZVRvTmVnYXRpdmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRTZXJ2aWNlLmNhbklucHV0TW9yZU51bWJlcnMgJiYgKCFpc05hTih0aGlzLmlucHV0U2VydmljZS52YWx1ZSkgfHwgU3RyaW5nLmZyb21DaGFyQ29kZShrZXlDb2RlKS5tYXRjaCgvXFxkLykgIT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0U2VydmljZS5hZGROdW1iZXIoa2V5Q29kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmlucHV0U2VydmljZS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlS2V5dXAoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRTZXJ2aWNlLmZpeEN1cnNvclBvc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUGFzdGUoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVhZE9ubHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFNlcnZpY2UudXBkYXRlRmllbGRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuaW5wdXRTZXJ2aWNlLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuaW5wdXRTZXJ2aWNlLnZhbHVlKTtcclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVPcHRpb25zKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T25Nb2RlbENoYW5nZSgpOiBGdW5jdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub25Nb2RlbENoYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRPbk1vZGVsQ2hhbmdlKGNhbGxiYWNrRnVuY3Rpb246IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gY2FsbGJhY2tGdW5jdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRPbk1vZGVsVG91Y2hlZCgpOiBGdW5jdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub25Nb2RlbFRvdWNoZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T25Nb2RlbFRvdWNoZWQoY2FsbGJhY2tGdW5jdGlvbjogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gY2FsbGJhY2tGdW5jdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFNlcnZpY2UudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5ld0tleUNvZGUob2xkU3RyaW5nOiBzdHJpbmcsIG5ld1N0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAob2xkU3RyaW5nLmxlbmd0aCA+IG5ld1N0cmluZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IG5ld1N0cmluZy5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICBpZiAob2xkU3RyaW5nLmxlbmd0aCA9PSB4IHx8IG9sZFN0cmluZ1t4XSAhPSBuZXdTdHJpbmdbeF0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdHJpbmcuY2hhckNvZGVBdCh4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQXJyb3dFbmRIb21lS2V5SW5GaXJlZm94KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoWzM1LCAzNiwgMzcsIDM4LCAzOSwgNDBdLmluZGV4T2YoZXZlbnQua2V5Q29kZSkgIT0gLTEgJiYgKGV2ZW50LmNoYXJDb2RlID09IHVuZGVmaW5lZCB8fCBldmVudC5jaGFyQ29kZSA9PSAwKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzUmVhZE9ubHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbElucHV0RWxlbWVudCAmJiB0aGlzLmh0bWxJbnB1dEVsZW1lbnQucmVhZE9ubHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDdXJzb3JQb3NpdGlvbihldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHJhd1ZhbHVlV2l0aG91dFN1ZmZpeEVuZFBvc2l0aW9uID0gdGhpcy5pbnB1dFNlcnZpY2UuZ2V0UmF3VmFsdWVXaXRob3V0U3VmZml4RW5kUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShyYXdWYWx1ZVdpdGhvdXRTdWZmaXhFbmRQb3NpdGlvbiwgcmF3VmFsdWVXaXRob3V0U3VmZml4RW5kUG9zaXRpb24pO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG59Il19