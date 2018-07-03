import utils from 'hey-utils';
import manba from 'manba';

const rclass = /[\t\r\n\f]/g;
const rnotwhite = (/\S+/g);

function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
}
module.exports = utils.extend({}, utils, {
    in72hours(date) {
        return manba().distance(manba(date), manba.HOUR) <= 72;
    },
    inHours(date, number) {
        return manba().distance(manba(date), manba.HOUR) <= number;
    },
    isBlank(input) {
        return input === undefined || input === null || input === '';
    },
    backTop() {
        document.getElementById('app').scrollTop = 0;
    },
    backTopById(id) {
        document.getElementById(id).scrollTop = 0;
    },
    addClass(elem, value) {
        let classes;
        let cur;
        let curValue;
        let clazz;
        let j;
        let finalValue;

        if (typeof value === "string" && value) {
            classes = value.match(rnotwhite) || [];

            curValue = getClass(elem);
            cur = elem.nodeType === 1 &&
                (` ${curValue} `).replace(rclass, " ");

            if (cur) {
                j = 0;
                while ((clazz = classes[j++])) {
                    if (cur.indexOf(` ${clazz} `) < 0) {
                        cur += `${clazz} `;
                    }
                }
                finalValue = cur.trim();
                if (curValue !== finalValue) {
                    elem.setAttribute("class", finalValue);
                }
            }
        }
    },

    removeClass(elem, value) {
        let classes;
        let cur;
        let curValue;
        let clazz;
        let j;
        let finalValue;

        if (typeof value === "string" && value) {
            classes = value.match(rnotwhite) || [];

            curValue = getClass(elem);

            // This expression is here for better compressibility (see addClass)
            cur = elem.nodeType === 1 &&
                (` ${curValue} `).replace(rclass, " ");

            if (cur) {
                j = 0;
                while ((clazz = classes[j++])) {
                    while (cur.indexOf(` ${clazz} `) > -1) {
                        cur = cur.replace(` ${clazz} `, ' ');
                    }
                }

                finalValue = cur.trim();
                if (curValue !== finalValue) {
                    elem.setAttribute("class", finalValue);
                }
            }
        }

        return this;
    },
    removeDom(elem) {
        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    },
    hasClass(elem, selector) {
        let className;
        className = ` ${selector} `;
        if (elem.nodeType === 1 &&
            (` ${getClass(elem)} `).replace(rclass, " ").indexOf(className) > -1
        ) {
            return true;
        }

        return false;
    },
    getTopDomain() {
        let domain = document.domain;
        if (domain == 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(domain)) return domain;
        let dArr = domain.split('.');
        return dArr.splice(dArr.length - 2).join('.');
    },
    getImage(url, w, h) {
        if (!url) return '';
        if (w == undefined && h == undefined) return url;
        if (w == undefined) w = h * 2;
        if (h == undefined) h = w * 2;
        return `${url}?imageView2/1/w/${w}/h/${h}`;
    },
    getLocation(code, connector) {
        if (isNaN(parseInt(code))) return '';
        const LOC = HeyUI.getDict("LOCATIONS").OBJ;
        let html = '';

        const getLocText = (code) => {
            let text = '';
            if (!LOC[code] || !LOC[code].type) return text;

            switch (LOC[code].type) {
                case 'country':
                    {
                        text = LOC[code].name;
                        break;
                    }
                case 'province':
                    {
                        text = LOC[code].shortName;
                        break;
                    }
                case 'city':
                    {
                        if (LOC[LOC[code].parentCode].type == 'country') {
                            text = LOC[code].shortName;
                        } else {
                            text = `${LOC[LOC[code].parentCode].shortName}/${LOC[code].shortName}`;
                        }
                        break;
                    }
                case 'district':
                    {
                        const cCode = LOC[code].parentCode;
                        const pCode = LOC[cCode].parentCode;
                        if (LOC[pCode].type == 'city') {
                            text = `${LOC[pCode].shortName}/${LOC[code].shortName}`;
                        } else {
                            text = `${LOC[pCode].shortName}/${LOC[cCode].shortName}/${LOC[code].name}`
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            return text;
        };

        if (code instanceof Array) {
            html = code.reduce((acc, cur) => acc.concat(getLocText(cur)), []).join(connector || ', ');
        } else {
            html = getLocText(code);
        }
        return html;
    },
    getLocation2(code, connector) {
        if (isNaN(parseInt(code))) return '';
        const LOC = HeyUI.getDict("LOCATIONS").OBJ;
        let html = '';

        const getLocText = (code) => {
            let text = '';
            if (!LOC[code] || !LOC[code].type) return text;

            switch (LOC[code].type) {
                case 'country':
                    {
                        text = LOC[code].name;
                        break;
                    }
                case 'province':
                    {
                        text = LOC[code].shortName;
                        break;
                    }
                case 'city':
                    {
                        if (LOC[LOC[code].parentCode].type == 'country') {
                            text = LOC[code].shortName;
                        } else {
                            text = `${LOC[code].shortName}`;
                        }
                        break;
                    }
                case 'district':
                    {
                        const cCode = LOC[code].parentCode;
                        const pCode = LOC[cCode].parentCode;
                        if (LOC[pCode].type == 'city') {
                            text = `${LOC[pCode].shortName}/${LOC[code].shortName}`;
                        } else {
                            text = `${LOC[cCode].shortName}/${LOC[code].name}`
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            return text;
        };

        if (code instanceof Array) {
            html = code.reduce((acc, cur) => acc.concat(getLocText(cur)), []).join(connector || ', ');
        } else {
            html = getLocText(code);
        }
        return html;
    },
    getLimitedName(name) {
        if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") == -1) {
            let dot = name.lastIndexOf(".");
            if (dot > 10) {
                name = name.substring(0, 10) + name.substring(dot);
            } else if (dot == -1) {
                name = name.substring(0, 10);
            }
        }
        return name;
    },
    downloadAttachment(url, name) {
        const $iframe = $('<iframe></iframe>');
        name = this.getLimitedName(name);
        $iframe.attr('src', `${url}?attname=${encodeURIComponent(name)}`);
        $iframe.attr('style', 'display:none');
        $('body').append($iframe);
        setTimeout(_ => $iframe.remove(), 1000);
    },
    initWeekDate() {
        let start = manba().startOf(manba.WEEK, manba.MONDAY);
        let end = manba(start).add(7, manba.DAY);
        log({
            start: start.format(),
            end: end.format(),
            type: 'week'
        })
        return {
            start: start.format(),
            end: end.format(),
            type: 'week'
        }
    },
    getMonthDays(date) {
        let today = manba();
        let distance = manba(date).distance(manba(), manba.MONTH);
        if (this.isArray(distance) && distance.length) {
            return distance.map(d => this.getWeekDays(d));
        }

        distance = distance || 0;
        let firstDate = manba().add(distance, manba.MONTH).startOf(manba.MONTH);
        let lastDate = manba().add(distance, manba.MONTH).endOf(manba.MONTH);
        let firstDay = firstDate.day(); // 月首为星期几
        let lastDay = lastDate.day(); // 月尾为星期几
        let monthDays = lastDate.date(); //该月总共有多少天
        let firstGap = firstDay - 1; // 前补充几天
        let lastGap = lastDay == 0 ? 0 : 7 - lastDay; // // 前补充几天
        let count = firstGap + monthDays + lastGap;
        let result = [];
        for (let i = 0; i < count; i++) {
            let cursor = manba().startOf(manba.DAY).add(distance, manba.MONTH).startOf(manba.MONTH).add(-firstGap + i, manba.DAY);
            if (i % 7 == 0) {
                result.push([]);
            }
            result[result.length - 1].push({
                date: cursor,
                text: cursor.date(),
                isFuture: cursor.distance(today, manba.DAY) >= 0,
                isToday: cursor.distance(today, manba.DAY) == 0,
                dateStr: cursor.format('l'),
                hasTodo: false,
                thisMonth: (i + 1) > firstGap && (i + 1) <= monthDays + firstGap,
            });
        }
        return result;
    },
    getWeekDays(distance) {
        let today = manba();
        if (this.isArray(distance) && distance.length) {
            return distance.map(d => this.getWeekDays(d));
        }
        distance = distance || 0;
        let ref = manba().add(distance, manba.WEEK);
        let len = 7;
        let day = ref.day() == 0 ? 7 : ref.day();
        let offset = -(day - 1); //day - len;
        let result = [];
        for (let i = 0; i < len; i++) {
            let cursor = manba().startOf(manba.DAY).add(distance, manba.WEEK).add(offset + i, manba.DAY);
            result.push({
                date: cursor,
                text: cursor.date(),
                isFuture: cursor.distance(today, manba.DAY) >= 0,
                isToday: cursor.distance(today, manba.DAY) == 0,
                dateStr: cursor.format('l'),
                // text: cursor.format('l'),
                hasTodo: false,
                thisMonth: false,
            });
        }
        return result;
    },
    getAd(list, key) {
        if (list[key] && list[key].length) {
            return this.extend({}, list[key][0]);
        }
        return null;
    },
    getNewAd(list, key) {
        let newList = [];
        if (list[key] && list[key].length) {
            for (let i = 0; i < list[key].length; i++) {
                newList.push(list[key][i]);
            }
        }
        return newList;
    },
    sortArray(array) {
        let start = 1;
        /*按顺序，每一项检查已排列好的序列*/
        for (let i = start; i < array.length; start++ , i++) {
            /*跟已排好序的序列做对比，并插入到合适的位置*/
            for (let j = 0; j < start; j++) {
                /*小于或者等于时（我们是升序）插入到该项前面*/
                if (array[i].orderNo < array[j].orderNo) {
                    array.splice(j, 0, array[i]);
                    /*删除原有项*/
                    array.splice(i + 1, 1);
                    break;
                }
            }
        }
        return array;
    },
    isOrderFailure(status) {
        return [12, 13, 22, 23, 42, 52].indexOf(status) > -1;
    },
    multipleCompare(a, b, key, keys) {
        let index = keys.indexOf(key);
        let next = keys[index + 1];

        if (index == -1) return 0;
        if (a[key] && b[key]) {
            if (b[key] == a[key]) {
                return this.multipleCompare(a, b, next, keys);
            } else if (b[key] > a[key]) {
                return 1;
            } else {
                return -1;
            }
        } else if (a[key]) {
            return -1;//0-a[key]
        } else if (b[key]) {
            return 1;//b[key]-0
        } else {
            return this.multipleCompare(a, b, next, keys);
        }
    },
    getProjectFeeRule(project) {
        let projectFeeRule = project.projectFeeRule;
        let warrantyPeriod = projectFeeRule.ensureMonth;
        let rateLower = 0, rateUpper = 0;
        let type = projectFeeRule.type;
        if (projectFeeRule.type == 2) {
            for (let fee of projectFeeRule.ratioFees) {
                if (fee.salaryLower <= project.salaryLower * 10000 && fee.salaryUpper > project.salaryLower * 10000) {
                    rateLower = fee.ratio;
                }
                if (fee.salaryLower <= project.salaryUpper * 10000 && fee.salaryUpper > project.salaryUpper * 10000) {
                    warrantyPeriod = fee.ensureMonth;
                    rateUpper = fee.ratio;
                }
            }
        }
        return {
            type,
            monthNum: projectFeeRule.monthNum,
            ratio: projectFeeRule.ratio / 100,
            fix: projectFeeRule.fix,
            rateLower: rateLower / 100,
            rateUpper: rateUpper / 100,
            warrantyPeriod
        }
    },
    openAd(data, action, actionName) {
        G.get('stat').click({
            action,
            actionName,
            content: data
        });
        let url = data.linkUrl;
        if (url != "" && url.indexOf("http") == -1) {
            url = `http://${url}`;
        }
        if (url) {
            window.open(url);
        }
    },

    getWeight(d) {
        return ((manba(d.deadlineAt).hours() * 100 + manba(d.deadlineAt).minutes()));
    },
    customSortTime(list) {
        // 有小时分的按时间先后顺序排，没时间的都排在后面
        return list.sort((a, b) => {
            let aWeight = this.getWeight(a) || 2460;
            let bWeight = this.getWeight(b) || 2460;
            return aWeight - bWeight;
        })
    },
    categroyMapping(code, connector) {
        if (isNaN(parseInt(code))) return '';
        const CATEGORY = this.toObject(HeyUI.getDict('POSITION_CATEGORY'), 'code');
        let html = '';

        const getCategoryText = (code) => {
            let text = '';
            let c = CATEGORY[code];
            if (c) {
                if (c.parentCodes.length > 0) {
                    let p = CATEGORY[c.parentCodes[0]];
                    if (p.parentCodes.length > 0) {
                        let p2 = CATEGORY[p.parentCodes[0]];
                        text = p2.name + "/" + p.name + "/" + c.name;
                    } else {
                        text = p.name + "/" + c.name;
                    }
                } else {
                    text = c.name;
                }
                return text;
            }
        };
        if (code instanceof Array) {
            html = code.reduce((acc, cur) => acc.concat(getCategoryText(cur)), []).join(connector || ', ');
        } else {
            html = getCategoryText(code);
        }
        return html;
    },
    getLocationParent(location) {
        const LOC = HeyUI.getDict("LOCATIONS").OBJ;
        let parentCode = location.parentCode;
        if (LOC[parentCode].parentCode) {
            let parent = LOC[LOC[parentCode].parentCode];
            if (parent.type == 'city') {
                return parent;
            }
        }
        return LOC[parentCode];
    },
    getLocationProvince(locationCode) {
        const LOC = HeyUI.getDict("LOCATIONS").OBJ;
        let location = this.copy(LOC[locationCode]);
        if (locationCode == -1 || (location.type == 'country' && location.name != '中国')) {
            return this.getOverSeaCountry({}).parent
        }
        while (location.type != 'country' && location.type != 'province' && location.type != 'province2') {
            let locationParent = this.copy(LOC[location.parentCode]);
            if (locationParent.name == "中国") {
                if (location.type == 'city') {
                    location.type = 'province2';
                }
            } else {
                location = locationParent;
            }
        }
        return location;
    },
    getOverSeaCountry(location) {
        return {
            location: this.extend({}, location, { type: "city", parentCode: -1 }),
            parent: {
                type: 'province',
                name: '海外',
                shortName: '海外',
                code: -1,
                parentCode: 0,
                hot: 0,
            }
        }
    },
});
