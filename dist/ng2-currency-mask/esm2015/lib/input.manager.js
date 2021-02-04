export class InputManager {
    constructor(htmlInputElement) {
        this.htmlInputElement = htmlInputElement;
    }
    setCursorAt(position) {
        if (this.htmlInputElement.setSelectionRange) {
            this.htmlInputElement.focus();
            this.htmlInputElement.setSelectionRange(position, position);
        }
        else if (this.htmlInputElement.createTextRange) {
            let textRange = this.htmlInputElement.createTextRange();
            textRange.collapse(true);
            textRange.moveEnd("character", position);
            textRange.moveStart("character", position);
            textRange.select();
        }
    }
    updateValueAndCursor(newRawValue, oldLength, selectionStart) {
        this.rawValue = newRawValue;
        let newLength = newRawValue.length;
        selectionStart = selectionStart - (oldLength - newLength);
        this.setCursorAt(selectionStart);
    }
    get canInputMoreNumbers() {
        let haventReachedMaxLength = !(this.rawValue.length >= this.htmlInputElement.maxLength && this.htmlInputElement.maxLength >= 0);
        let selectionStart = this.inputSelection.selectionStart;
        let selectionEnd = this.inputSelection.selectionEnd;
        let haveNumberSelected = (selectionStart != selectionEnd && this.htmlInputElement.value.substring(selectionStart, selectionEnd).match(/\d/)) ? true : false;
        let startWithZero = (this.htmlInputElement.value.substring(0, 1) == "0");
        return haventReachedMaxLength || haveNumberSelected || startWithZero;
    }
    get inputSelection() {
        let selectionStart = 0;
        let selectionEnd = 0;
        if (typeof this.htmlInputElement.selectionStart == "number" && typeof this.htmlInputElement.selectionEnd == "number") {
            selectionStart = this.htmlInputElement.selectionStart;
            selectionEnd = this.htmlInputElement.selectionEnd;
        }
        else {
            let range = document.getSelection().anchorNode;
            if (range && range.firstChild == this.htmlInputElement) {
                let lenght = this.htmlInputElement.value.length;
                let normalizedValue = this.htmlInputElement.value.replace(/\r\n/g, "\n");
                let startRange = this.htmlInputElement.createTextRange();
                let endRange = this.htmlInputElement.createTextRange();
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
    }
    get rawValue() {
        return this.htmlInputElement && this.htmlInputElement.value;
    }
    set rawValue(value) {
        this._storedRawValue = value;
        if (this.htmlInputElement) {
            this.htmlInputElement.value = value;
        }
    }
    get storedRawValue() {
        return this._storedRawValue;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1jdXJyZW5jeS1tYXNrLyIsInNvdXJjZXMiOlsibGliL2lucHV0Lm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFlBQVk7SUFJckIsWUFBb0IsZ0JBQXFCO1FBQXJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBSztJQUN6QyxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWdCO1FBQ3hCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1lBQzlDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4RCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxXQUFtQixFQUFFLFNBQWlCLEVBQUUsY0FBc0I7UUFDL0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDNUIsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxjQUFjLEdBQUcsY0FBYyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFD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QUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3pELFlBQVksSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztxQkFDakY7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTztZQUNILGNBQWMsRUFBRSxjQUFjO1lBQzlCLFlBQVksRUFBRSxZQUFZO1NBQzdCLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIElucHV0TWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RvcmVkUmF3VmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0bWxJbnB1dEVsZW1lbnQ6IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnNvckF0KHBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5odG1sSW5wdXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbElucHV0RWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLmh0bWxJbnB1dEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UocG9zaXRpb24sIHBvc2l0aW9uKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaHRtbElucHV0RWxlbWVudC5jcmVhdGVUZXh0UmFuZ2UpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRSYW5nZSA9IHRoaXMuaHRtbElucHV0RWxlbWVudC5jcmVhdGVUZXh0UmFuZ2UoKTtcclxuICAgICAgICAgICAgdGV4dFJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZUVuZChcImNoYXJhY3RlclwiLCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRleHRSYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZhbHVlQW5kQ3Vyc29yKG5ld1Jhd1ZhbHVlOiBzdHJpbmcsIG9sZExlbmd0aDogbnVtYmVyLCBzZWxlY3Rpb25TdGFydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yYXdWYWx1ZSA9IG5ld1Jhd1ZhbHVlO1xyXG4gICAgICAgIGxldCBuZXdMZW5ndGggPSBuZXdSYXdWYWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydCAtIChvbGRMZW5ndGggLSBuZXdMZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yQXQoc2VsZWN0aW9uU3RhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYW5JbnB1dE1vcmVOdW1iZXJzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBoYXZlbnRSZWFjaGVkTWF4TGVuZ3RoID0gISh0aGlzLnJhd1ZhbHVlLmxlbmd0aCA+PSB0aGlzLmh0bWxJbnB1dEVsZW1lbnQubWF4TGVuZ3RoICYmIHRoaXMuaHRtbElucHV0RWxlbWVudC5tYXhMZW5ndGggPj0gMCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5pbnB1dFNlbGVjdGlvbi5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uRW5kID0gdGhpcy5pbnB1dFNlbGVjdGlvbi5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgbGV0IGhhdmVOdW1iZXJTZWxlY3RlZCA9IChzZWxlY3Rpb25TdGFydCAhPSBzZWxlY3Rpb25FbmQgJiYgdGhpcy5odG1sSW5wdXRFbGVtZW50LnZhbHVlLnN1YnN0cmluZyhzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKS5tYXRjaCgvXFxkLykpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIGxldCBzdGFydFdpdGhaZXJvID0gKHRoaXMuaHRtbElucHV0RWxlbWVudC52YWx1ZS5zdWJzdHJpbmcoMCwgMSkgPT0gXCIwXCIpO1xyXG4gICAgICAgIHJldHVybiBoYXZlbnRSZWFjaGVkTWF4TGVuZ3RoIHx8IGhhdmVOdW1iZXJTZWxlY3RlZCB8fCBzdGFydFdpdGhaZXJvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dFNlbGVjdGlvbigpOiBhbnkge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbkVuZCA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5odG1sSW5wdXRFbGVtZW50LnNlbGVjdGlvblN0YXJ0ID09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHRoaXMuaHRtbElucHV0RWxlbWVudC5zZWxlY3Rpb25FbmQgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHRoaXMuaHRtbElucHV0RWxlbWVudC5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgc2VsZWN0aW9uRW5kID0gdGhpcy5odG1sSW5wdXRFbGVtZW50LnNlbGVjdGlvbkVuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmFuZ2UgPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJhbmdlICYmIHJhbmdlLmZpcnN0Q2hpbGQgPT0gdGhpcy5odG1sSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuZ2h0ID0gdGhpcy5odG1sSW5wdXRFbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGxldCBub3JtYWxpemVkVmFsdWUgPSB0aGlzLmh0bWxJbnB1dEVsZW1lbnQudmFsdWUucmVwbGFjZSgvXFxyXFxuL2csIFwiXFxuXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0UmFuZ2UgPSB0aGlzLmh0bWxJbnB1dEVsZW1lbnQuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kUmFuZ2UgPSB0aGlzLmh0bWxJbnB1dEVsZW1lbnQuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICBlbmRSYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0UmFuZ2UuY29tcGFyZUVuZFBvaW50cyhcIlN0YXJ0VG9FbmRcIiwgZW5kUmFuZ2UpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvbkVuZCA9IGxlbmdodDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSAtc3RhcnRSYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgLWxlbmdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgKz0gbm9ybWFsaXplZFZhbHVlLnNsaWNlKDAsIHNlbGVjdGlvblN0YXJ0KS5zcGxpdChcIlxcblwiKS5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRSYW5nZS5jb21wYXJlRW5kUG9pbnRzKFwiRW5kVG9FbmRcIiwgZW5kUmFuZ2UpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uRW5kID0gbGVuZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IC1zdGFydFJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgLWxlbmdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkVuZCArPSBub3JtYWxpemVkVmFsdWUuc2xpY2UoMCwgc2VsZWN0aW9uRW5kKS5zcGxpdChcIlxcblwiKS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQ6IHNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25FbmQ6IHNlbGVjdGlvbkVuZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJhd1ZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbElucHV0RWxlbWVudCAmJiB0aGlzLmh0bWxJbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHJhd1ZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZWRSYXdWYWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5odG1sSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHRtbElucHV0RWxlbWVudC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RvcmVkUmF3VmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmVkUmF3VmFsdWU7XHJcbiAgICB9XHJcbn0iXX0=