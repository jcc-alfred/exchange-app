class SortSelectAndSearchModel {
    constructor( displayTitle, displayContent, key, sort, data ) {
        this._displayTitle = displayTitle;
        this._displayContent = displayContent;
        this._key = key;
        this._sort = sort;
        this._data = data;
    }

    get displayTitle() {
        return this._displayTitle;
    }

    get displayContent() {
        return this._displayContent;
    }

    get key() {
        return this._key;
    }

    get sort() {
        return this._sort;
    }

    get data() {
        return this._data;
    }

    toString() {
        return '(' + "displayTitle = " + this._displayTitle + "; displayContent = " + this._displayContent + "; key = " + this._key + "; sort = " + this._sort + ')';
    }
}

export default SortSelectAndSearchModel;
