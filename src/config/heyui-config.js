// import autocompleteConfig from './autocomplete-config';
// import treeConfig from './tree-config';
// import categoryConfig from './category-config';
import zh from 'heyui/dist/locale/zh-CN';

const heyuiConfig = () => {

    HeyUI.config('page.small', true);
    HeyUI.config('dict.keyName', "code");
    HeyUI.config('dict.titleName', "name");
    HeyUI.config('modal.hasDivider', true);

    HeyUI.config("autocomplete.configs", autocompleteConfig());
    HeyUI.config("autocomplete.default.keyName", 'code');
    HeyUI.config("autocomplete.default.titleName", 'name');
    HeyUI.config("tree.configs", treeConfig());
    HeyUI.config("category.configs", categoryConfig());

    HeyUI.config('menu', {
        keyName: 'key',
        titleName: 'title',
        childrenName: 'children'
    });

    zh.h.datepicker.placeholder = '请选择';

    HeyUI.locale(zh);

};

export default heyuiConfig;
