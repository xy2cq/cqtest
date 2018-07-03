import Vue from 'vue';
import CommonUtils from './utils';
import manba from 'manba';

Vue.filter('format', (value, format) => {
    if (value) {
        return manba(value).format(format || 'l');
    }
    return '';
});

Vue.filter('getlocation', (code, connector) => {
    return CommonUtils.getLocation(code, connector);
});

Vue.filter('getlocation2', (code, connector) => { //专门为了公开搜索写的
    return CommonUtils.getLocation2(code, connector);
});

Vue.filter('categroyMapping', (code, connector) => {
    return CommonUtils.categroyMapping(code, connector);
});

Vue.filter('cny', (money = 0) => {
    money = [...String(parseInt(money) || '0')].reverse();
    let index = 3;
    while (index < money.length) {
        money.splice(index, 0, ',');
        index += 4;
    }
    return `￥${money.reverse().join('')}`;
});


Vue.filter('expectSalary', (basic) => {
    if (basic.negotiable) {
        return '面议';
    }

    return `${HeyUI.dictMapping(basic.expectSalaryType, 'ANNUAL_SALARY_TYPE')} ${basic.expectSalary}万`;
});


Vue.filter('parseInt', (code) => {
    return parseInt(code) || 0;
});

Vue.filter('showLocations', (codes, limit) => {
    codes = codes || [];
    let locs = codes.map(item => CommonUtils.getLocation(item));
    if (locs.length == 0) {
        return '';
    }
    if (!limit) {
        return locs.join("、");
    }

    return `${locs[0]}${locs.length > 1 ? ' 等' : ''}`;
});

Vue.filter('img', (url, w, h, ratio) => {
    let style = '';
    if (url) {
        let imgUrl = `${url}?imageView/2/`;
        if (url.indexOf('?') > -1) {
            imgUrl = url;
        } else {
            if (w) imgUrl += `w/${w * 3}/`;
            if (h) imgUrl += `h/${h * 3}/`;
        }
        style += `background-image:url(${imgUrl});background-color:transparent;`;
    }
    if (ratio) {
        if (w && h) {
            style += `width:${w}px;height:${h}px;background-size:cover;`;
            // background-size: ${w}px ${h}px
        } else if (w) {
            style += `height:${w * ratio}px;background-size:cover;`;
            // background-size: 248px ${w * ratio}px
        } else if (h) {
            style += `width:${h / ratio}px;background-size:cover;`;
            // background-size: ${(h / ratio)}px 240px
        }
    }
    return style;
});

Vue.filter('in72hours', date => Utils.in72hours(date));
Vue.filter('inHours', date => Utils.inHours(date));

Vue.filter('format', (date, format) => {
    return manba(date).format(format || 'l');
})

Vue.filter('age', (val) => {
    let num = parseFloat(val || 0) || 0;
    let year = new Date().getFullYear();
    return year - num;
})

Vue.filter('showRate', (projectFeeRule) => {
    if (projectFeeRule.type == 2) {
        return `最高至${(projectFeeRule.rateUpper || 0) * 100}%`;
    } else if (projectFeeRule.type == 4) {
        return `固定收费${parseInt(projectFeeRule.fix || 0) / 1000}K`;
    } else if (projectFeeRule.type == 5) {
        return `固定费率${(projectFeeRule.ratio || 0) * 100}%`;
    } else if (projectFeeRule.type == 6) {
        return `${projectFeeRule.monthNum}个月月薪`;
    }
})

Vue.filter('percent', (rate) => {
    return ((rate || 0) * 100);
});

Vue.filter('removeExt', (phoneStr) => {
    if (!phoneStr) return phoneStr;
    return phoneStr.split('-').slice(0, 2).join('-')
});


Vue.filter('distance', (date) => {
    const hours = manba().distance(date, manba.HOUR);
    if (hours < 24) {
        if (hours == 0) {
            const mins = manba().distance(date, manba.MINUTE);
            return `${mins}分钟`
        }
        return `${hours}小时`;
    }
    const days = manba().distance(date, manba.DAY);
    return `${days}天`;
})

Vue.filter('toFix', (val, len) => {
    let num = parseFloat(val || 0) || 0;
    let count = len !== undefined ? len : 2;
    let fixed = parseFloat(num.toFixed(count));
    let finish = false;
    while (!finish && count) {
        let str = `${fixed}`;
        if (!str[str.length - 1]) {
            count -= 1;
            fixed = parseFloat(num.toFixed(count));
        } else {
            finish = true;
        }
    }
    return fixed;
})

Vue.filter('minutes', (val) => {
    let num = parseFloat(val || 0) || 0;
    return `${Math.floor(num / 60)}′${Math.floor(num % 60)}″`;
});

Vue.filter('in72hours', (date) => {
    return Utils.in72hours(date);
});

Vue.filter('bg', (url, w = 85, h = 85) => {
    const imgUrl = Utils.getImage(url, w, h);
    return imgUrl ? `background-image:url(${imgUrl})` : '';
});

Vue.filter('tenThousand', (value) => {
    return (value instanceof Number || Object.prototype.toString.call(value) === '[object Number]') ? (value / 10000).toFixed(2) : value;
});

Vue.filter('formatEmpty', (value, str) => {
    if (!value) {
        return str || '无';
    }
    return value;
});
