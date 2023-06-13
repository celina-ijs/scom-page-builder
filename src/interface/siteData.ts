import { IPageBlockData } from "./pageBlock";

export interface IPageData {
    cid?: string;
    title?: string;
    name: string;
    path: string;
    url: string;
    visible: boolean;

    header: IPageHeader;
	sections: IPageSection[];
	footer: IPageFooter;
}

export enum HeaderType {
    'COVER' = 'cover',
    'LARGE' = 'largeBanner',
    'NORMAL' = 'banner',
    'TITLE' = 'titleOnly'
};
export interface IPageHeader {
	headerType: HeaderType;
	image: string;
	elements: IPageElement[];
    config?: IConfigData;
}

export interface IPageSection {
	id: string; // uuid
	row: number;
	image?: string;
    backgroundColor?: string;
	elements: IPageElement[];
    config?: IConfigData;
}

export interface IPageFooter {
	image: string;
	elements: IPageElement[];
    config?: IConfigData;
}

export enum ElementType {
    PRIMITIVE = 'primitive',
    COMPOSITE = 'composite'
}

export interface IPageElement {
    id: string; // uuid
	column: number;
	columnSpan: number;
	type: ElementType,
    tag?: any;
    properties: any;
	module?: IPageBlockData; // follow the standard defined in secure page, if type === 'primitive'
	elements?: IPageElement[]; // type === 'composite'

    visibleOn?: string;
    invisibleOn?: string;
}

export enum IColumnLayoutType {
    FIXED = 'Fixed',
    AUTOMATIC = 'Automatic'
}

export type AlignType = 'left' | 'center' | 'right';

export interface IConfigData {
    columnLayout?: IColumnLayoutType;
    columnsNumber?: number;
    maxColumnsPerRow?: number;
    columnMinWidth?: number|string;
    align?: AlignType;
}

export interface IRowSettings {
    backgroundColor?: string;
    config?: IConfigData;
}

export interface IOnFetchComponentsOptions {
    category?: string;
    pageNumber?: number;
    pageSize?: number;
    keyword?: string;
}
export interface IOnFetchComponentsResult {
    items?: IPageBlockData[];
    total?: number
}

export interface ICategory {
    id: string;
    title: string;
}