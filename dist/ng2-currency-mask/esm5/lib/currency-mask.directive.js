import { Directive, forwardRef, HostListener, Inject, Input, Optional } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CURRENCY_MASK_CONFIG } from "./currency-mask.config";
import { InputHandler } from "./input.handler";
import * as i0 from "@angular/core";
export var CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CurrencyMaskDirective; }),
    multi: true
};
var CurrencyMaskDirective = /** @class */ (function () {
    function CurrencyMaskDirective(currencyMaskConfig, elementRef, keyValueDiffers) {
        this.currencyMaskConfig = currencyMaskConfig;
        this.elementRef = elementRef;
        this.keyValueDiffers = keyValueDiffers;
        this.options = {};
        this.optionsTemplate = {
            align: "right",
            allowNegative: true,
            decimal: ".",
            precision: 2,
            prefix: "$ ",
            suffix: "",
            thousands: ","
        };
        if (currencyMaskConfig) {
            this.optionsTemplate = currencyMaskConfig;
        }
        this.keyValueDiffer = keyValueDiffers.find({}).create();
    }
    CurrencyMaskDirective.prototype.ngAfterViewInit = function () {
        console.log('test');
        this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
    };
    CurrencyMaskDirective.prototype.ngDoCheck = function () {
        if (this.keyValueDiffer.diff(this.options)) {
            this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
            this.inputHandler.updateOptions(Object.assign({}, this.optionsTemplate, this.options));
        }
    };
    CurrencyMaskDirective.prototype.ngOnInit = function () {
        this.inputHandler = new InputHandler(this.elementRef.nativeElement, Object.assign({}, this.optionsTemplate, this.options));
    };
    CurrencyMaskDirective.prototype.handleBlur = function (event) {
        this.inputHandler.getOnModelTouched().apply(event);
    };
    CurrencyMaskDirective.prototype.handleClick = function (event) {
        this.inputHandler.handleClick(event, this.isChromeAndroid());
    };
    CurrencyMaskDirective.prototype.handleCut = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleCut(event);
        }
    };
    CurrencyMaskDirective.prototype.handleInput = function (event) {
        if (this.isChromeAndroid()) {
            this.inputHandler.handleInput(event);
        }
    };
    CurrencyMaskDirective.prototype.handleKeydown = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeydown(event);
        }
    };
    CurrencyMaskDirective.prototype.handleKeypress = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeypress(event);
        }
    };
    CurrencyMaskDirective.prototype.handleKeyup = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeyup(event);
        }
    };
    CurrencyMaskDirective.prototype.handlePaste = function (event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handlePaste(event);
        }
    };
    CurrencyMaskDirective.prototype.isChromeAndroid = function () {
        return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
    };
    CurrencyMaskDirective.prototype.registerOnChange = function (callbackFunction) {
        this.inputHandler.setOnModelChange(callbackFunction);
    };
    CurrencyMaskDirective.prototype.registerOnTouched = function (callbackFunction) {
        this.inputHandler.setOnModelTouched(callbackFunction);
    };
    CurrencyMaskDirective.prototype.setDisabledState = function (value) {
        this.elementRef.nativeElement.disabled = value;
    };
    CurrencyMaskDirective.prototype.validate = function (abstractControl) {
        var result = {};
        if (abstractControl.value > this.max) {
            result.max = true;
        }
        if (abstractControl.value < this.min) {
            result.min = true;
        }
        return result != {} ? result : null;
    };
    CurrencyMaskDirective.prototype.writeValue = function (value) {
        this.inputHandler.setValue(value);
    };
    CurrencyMaskDirective.ɵfac = function CurrencyMaskDirective_Factory(t) { return new (t || CurrencyMaskDirective)(i0.ɵɵdirectiveInject(CURRENCY_MASK_CONFIG, 8), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.KeyValueDiffers)); };
    CurrencyMaskDirective.ɵdir = i0.ɵɵdefineDirective({ type: CurrencyMaskDirective, selectors: [["", "currencyMask", ""]], hostBindings: function CurrencyMaskDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("blur", function CurrencyMaskDirective_blur_HostBindingHandler($event) { return ctx.handleBlur($event); })("click", function CurrencyMaskDirective_click_HostBindingHandler($event) { return ctx.handleClick($event); })("cut", function CurrencyMaskDirective_cut_HostBindingHandler($event) { return ctx.handleCut($event); })("input", function CurrencyMaskDirective_input_HostBindingHandler($event) { return ctx.handleInput($event); })("keydown", function CurrencyMaskDirective_keydown_HostBindingHandler($event) { return ctx.handleKeydown($event); })("keypress", function CurrencyMaskDirective_keypress_HostBindingHandler($event) { return ctx.handleKeypress($event); })("keyup", function CurrencyMaskDirective_keyup_HostBindingHandler($event) { return ctx.handleKeyup($event); })("paste", function CurrencyMaskDirective_paste_HostBindingHandler($event) { return ctx.handlePaste($event); });
        } }, inputs: { max: "max", min: "min", options: "options" }, features: [i0.ɵɵProvidersFeature([
                CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
                { provide: NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true }
            ])] });
    return CurrencyMaskDirective;
}());
export { CurrencyMaskDirective };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CurrencyMaskDirective, [{
        type: Directive,
        args: [{
                selector: "[currencyMask]",
                providers: [
                    CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
                    { provide: NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true }
                ]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [CURRENCY_MASK_CONFIG]
            }] }, { type: i0.ElementRef }, { type: i0.KeyValueDiffers }]; }, { max: [{
            type: Input
        }], min: [{
            type: Input
        }], options: [{
            type: Input
        }], handleBlur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }], handleClick: [{
            type: HostListener,
            args: ["click", ["$event"]]
        }], handleCut: [{
            type: HostListener,
            args: ["cut", ["$event"]]
        }], handleInput: [{
            type: HostListener,
            args: ["input", ["$event"]]
        }], handleKeydown: [{
            type: HostListener,
            args: ["keydown", ["$event"]]
        }], handleKeypress: [{
            type: HostListener,
            args: ["keypress", ["$event"]]
        }], handleKeyup: [{
            type: HostListener,
            args: ["keyup", ["$event"]]
        }], handlePaste: [{
            type: HostListener,
            args: ["paste", ["$event"]]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktbWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItY3VycmVuY3ktbWFzay8iLCJzb3VyY2VzIjpbImxpYi9jdXJyZW5jeS1tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBdUIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUEyQyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUssT0FBTyxFQUF5QyxhQUFhLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwSCxPQUFPLEVBQXNCLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUvQyxNQUFNLENBQUMsSUFBTSxvQ0FBb0MsR0FBUTtJQUNyRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGO0lBMEJJLCtCQUE4RCxrQkFBc0MsRUFBVSxVQUFzQixFQUFVLGVBQWdDO1FBQWhILHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBZnJLLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFLM0Isb0JBQWUsR0FBRztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsYUFBYSxFQUFFLElBQUk7WUFDbkIsT0FBTyxFQUFFLEdBQUc7WUFDWixTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLEVBQUU7WUFDVixTQUFTLEVBQUUsR0FBRztTQUNqQixDQUFDO1FBR0UsSUFBSSxrQkFBa0IsRUFBRTtZQUNwQixJQUFJ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bGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsIE9uSW5pdCwgT3B0aW9uYWwgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IEN1cnJlbmN5TWFza0NvbmZpZywgQ1VSUkVOQ1lfTUFTS19DT05GSUcgfSBmcm9tIFwiLi9jdXJyZW5jeS1tYXNrLmNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi9pbnB1dC5oYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ1VSUkVOQ1lNQVNLRElSRUNUSVZFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5TWFza0RpcmVjdGl2ZSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogXCJbY3VycmVuY3lNYXNrXVwiLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ1VSUkVOQ1lNQVNLRElSRUNUSVZFX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IEN1cnJlbmN5TWFza0RpcmVjdGl2ZSwgbXVsdGk6IHRydWUgfVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3VycmVuY3lNYXNrRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIERvQ2hlY2ssIE9uSW5pdCwgVmFsaWRhdG9yIHtcclxuXHJcbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55ID0ge307XHJcblxyXG4gICAgaW5wdXRIYW5kbGVyOiBJbnB1dEhhbmRsZXI7XHJcbiAgICBrZXlWYWx1ZURpZmZlcjogS2V5VmFsdWVEaWZmZXI8YW55LCBhbnk+O1xyXG5cclxuICAgIG9wdGlvbnNUZW1wbGF0ZSA9IHtcclxuICAgICAgICBhbGlnbjogXCJyaWdodFwiLFxyXG4gICAgICAgIGFsbG93TmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgZGVjaW1hbDogXCIuXCIsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAyLFxyXG4gICAgICAgIHByZWZpeDogXCIkIFwiLFxyXG4gICAgICAgIHN1ZmZpeDogXCJcIixcclxuICAgICAgICB0aG91c2FuZHM6IFwiLFwiXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoQ1VSUkVOQ1lfTUFTS19DT05GSUcpIHByaXZhdGUgY3VycmVuY3lNYXNrQ29uZmlnOiBDdXJyZW5jeU1hc2tDb25maWcsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBrZXlWYWx1ZURpZmZlcnM6IEtleVZhbHVlRGlmZmVycykge1xyXG4gICAgICAgIGlmIChjdXJyZW5jeU1hc2tDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zVGVtcGxhdGUgPSBjdXJyZW5jeU1hc2tDb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmtleVZhbHVlRGlmZmVyID0ga2V5VmFsdWVEaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9IHRoaXMub3B0aW9ucy5hbGlnbiA/IHRoaXMub3B0aW9ucy5hbGlnbiA6IHRoaXMub3B0aW9uc1RlbXBsYXRlLmFsaWduO1xyXG4gICAgfVxyXG5cclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICBpZiAodGhpcy5rZXlWYWx1ZURpZmZlci5kaWZmKHRoaXMub3B0aW9ucykpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUudGV4dEFsaWduID0gdGhpcy5vcHRpb25zLmFsaWduID8gdGhpcy5vcHRpb25zLmFsaWduIDogdGhpcy5vcHRpb25zVGVtcGxhdGUuYWxpZ247XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLnVwZGF0ZU9wdGlvbnMoKDxhbnk+T2JqZWN0KS5hc3NpZ24oe30sIHRoaXMub3B0aW9uc1RlbXBsYXRlLCB0aGlzLm9wdGlvbnMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBuZXcgSW5wdXRIYW5kbGVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAoPGFueT5PYmplY3QpLmFzc2lnbih7fSwgdGhpcy5vcHRpb25zVGVtcGxhdGUsIHRoaXMub3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoXCJibHVyXCIsIFtcIiRldmVudFwiXSlcclxuICAgIGhhbmRsZUJsdXIoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmdldE9uTW9kZWxUb3VjaGVkKCkuYXBwbHkoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXHJcbiAgICBoYW5kbGVDbGljayhldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlQ2xpY2soZXZlbnQsIHRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoXCJjdXRcIiwgW1wiJGV2ZW50XCJdKVxyXG4gICAgaGFuZGxlQ3V0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlQ3V0KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcihcImlucHV0XCIsIFtcIiRldmVudFwiXSlcclxuICAgIGhhbmRsZUlucHV0KGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5oYW5kbGVJbnB1dChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcclxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5oYW5kbGVLZXlkb3duKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXByZXNzXCIsIFtcIiRldmVudFwiXSlcclxuICAgIGhhbmRsZUtleXByZXNzKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlS2V5cHJlc3MoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKFwia2V5dXBcIiwgW1wiJGV2ZW50XCJdKVxyXG4gICAgaGFuZGxlS2V5dXAoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5oYW5kbGVLZXl1cChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoXCJwYXN0ZVwiLCBbXCIkZXZlbnRcIl0pXHJcbiAgICBoYW5kbGVQYXN0ZShldmVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQ2hyb21lQW5kcm9pZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZVBhc3RlKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNDaHJvbWVBbmRyb2lkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAvY2hyb21lL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAvYW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShjYWxsYmFja0Z1bmN0aW9uOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLnNldE9uTW9kZWxDaGFuZ2UoY2FsbGJhY2tGdW5jdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoY2FsbGJhY2tGdW5jdGlvbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5zZXRPbk1vZGVsVG91Y2hlZChjYWxsYmFja0Z1bmN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZShhYnN0cmFjdENvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55OyB9IHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGFic3RyYWN0Q29udHJvbC52YWx1ZSA+IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5tYXggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFic3RyYWN0Q29udHJvbC52YWx1ZSA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5taW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCAhPSB7fSA/IHJlc3VsdCA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgfVxyXG59Il19