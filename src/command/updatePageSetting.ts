import { Control, application } from "@ijstech/components";
import { getMargin, getPageConfig, pageObject } from "../store/index";
import { ICommand } from "./interface";
import { IPageConfig, IPageSectionConfig } from '../interface/index';
import { EVENT } from "../const/index";
import { currentTheme  } from '../theme/index';

const Theme = currentTheme;

export class UpdatePageSettingsCommand implements ICommand {
  private element: any;
  private settings: IPageConfig
  private oldSettings: IPageConfig;
  private rowsConfig: {[key: string]: string} = {};

  constructor(element: Control, settings: IPageConfig) {
    this.element = element;
    this.oldSettings = {...getPageConfig()};
    this.settings = {...getPageConfig(), ...settings};
    const rows = this.element.querySelectorAll('ide-row');
    for (let row of rows) {
      const id = (row?.id || '').replace('row-', '');
      const oldConfig = pageObject.getRowConfig(id) || {};
      this.rowsConfig[id] = JSON.stringify({...this.oldSettings, ...oldConfig});
    }
  }

  private getChangedValues(newValue: IPageSectionConfig, oldValue: IPageSectionConfig) {
    let result = [];
    for (let prop in newValue) {
      if (prop === 'margin') {
        const { x: newX, y: newY } = newValue.margin;
        const { x: oldX, y: oldY } = oldValue.margin;
        if (newX !== oldX || newY !== oldY) result.push(prop);
      } else {
        if (newValue[prop] !== oldValue[prop]) result.push(prop);
      }
    }
    return result;
  }

  private updateConfig(config: IPageConfig, updatedValues: string[]) {
    const { backgroundColor, backgroundImage, customBackgroundColor, customTextColor, textColor, customTextSize, textSize, margin } = config;
    let newConfig: IPageConfig = {};
    for (let prop of updatedValues) {
      newConfig[prop] = config[prop];
    }
    const element = this.element.closest('i-scom-page-builder') || this.element;

    if (updatedValues.includes('backgroundImage')) {
      application.EventBus.dispatch(EVENT.ON_UPDATE_PAGE_BG, {image: backgroundImage});
    }
    const defaultBackgroundColor = Theme.background.main
    const defaultTextColor = Theme.text.primary
    const defaultTextSize = 'md'
    let data = {
      customBackgroundColor: false,
      backgroundColor: defaultBackgroundColor,
      customTextColor: false,
      textColor: defaultTextColor,
      customTextSize: false,
      textSize: defaultTextSize 
    }
    if (customBackgroundColor) {
      if (updatedValues.includes('backgroundColor')) {
        element.style.setProperty('--background-main', backgroundColor);
        data.customBackgroundColor = customBackgroundColor
        data.backgroundColor = backgroundColor;
      }
    } else {
      element.style.setProperty('--background-main', defaultBackgroundColor);
    }
    if (customTextColor) {
      if (updatedValues.includes('textColor')) {
        element.style.setProperty('--text-primary', textColor);
        data.customTextColor = customTextColor
        data.textColor = textColor;
      }
    } else {
      element.style.setProperty('--text-primary', defaultTextColor);
    }
    if (customTextSize) {
      if (updatedValues.includes('textSize')) {
        data.customTextSize = customTextSize
        data.textSize = textSize;
      }
    }
    application.EventBus.dispatch(EVENT.ON_UPDATE_PAGE_BG, {...data});
    this.element.maxWidth = '100%'; // maxWidth ?? '100%';
    this.element.margin = getMargin(margin);
    pageObject.config = { ...config };
    return newConfig;
  }

  execute(): void {
    const updatedValues = this.getChangedValues(this.settings, this.oldSettings);
    const newConfig = this.updateConfig(this.settings, updatedValues);
    application.EventBus.dispatch(EVENT.ON_UPDATE_PAGE_CONFIG, {config: newConfig});
  }

  undo(): void {
    const updatedValues = this.getChangedValues(this.oldSettings, this.settings);
    const newConfig = this.updateConfig(this.oldSettings, updatedValues);
    application.EventBus.dispatch(EVENT.ON_UPDATE_PAGE_CONFIG, {config: newConfig, rowsConfig: this.rowsConfig});
  }

  redo(): void {}
}
