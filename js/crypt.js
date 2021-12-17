// 加解密用到的密钥
function aesKeyBytes() {
    var key_Int = new Int8Array([65, 144, 48, 53, 18, 52, 86, 120, 131, 116, 124, 139, 237, 203, 169, 135]);
    var keyBytes = int8parse(key_Int);
    return keyBytes;
}
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

// 十六进制字符串数组，个数如果不足16整数倍则补0
function hexTo16Hex(str) {
    var diff = 16 - (str.length + 1) / 3 % 16;
    for(var i = 0; i < diff; i++) {
        str = str + " 00";
    }
    return str;
}

//解密方法
function decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
function encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}


function _encrypt (data, url)
{
    switch (url)
    {
        case CGI_NAME_LIST.QUERY_ON_JOB_LIST:
        case CGI_NAME_LIST.QUERY_OFF_JOB_LIST:
        case CGI_NAME_LIST.UPDATE:
            data.phoneNumber != null && (data.phoneNumber = encrypt(data.phoneNumber));
            data.employeeProfile != null && (data.employeeProfile = encrypt(data.employeeProfile));
            data.salary != null && Object.prototype.toString.call(data.salary) === '[object Array]' &&  (data.salary.map(e => {
                e.money = encrypt(e.money);
                e.time = encrypt(e.time);
                return e;
            }));
            break;
        case CGI_NAME_LIST.ADD:
            data.data.forEach(v => {
                v.phoneNumber != null && (v.phoneNumber = encrypt(v.phoneNumber));
                v.employeeProfile != null && (v.employeeProfile = encrypt(v.employeeProfile));
                v.salary != null && Object.prototype.toString.call(v.salary) === '[object Array]' &&  (v.salary.map(e => {
                    e.money = encrypt(e.money);
                    e.time = encrypt(e.time);
                    return e;
                }));
            });
        case CGI_NAME_LIST.ADD_ADMIN:
        case CGI_NAME_LIST.UPDATE_ADMIN:
            data.admin != null && (data.admin = encrypt(data.admin));
            data.passwork != null && (data.passwork = encrypt(data.passwork));
            break;

        default:
            break;
    }
    console.error('请求数据加密后'+ url, data);
    return data;
}
function _decrypt (data, url)
{
    switch (url)
    {
        case CGI_NAME_LIST.QUERY_ON_JOB_LIST:
        case CGI_NAME_LIST.QUERY_OFF_JOB_LIST:
            data.data.forEach(v => {
                try{
                    v.phoneNumber != null && (v.phoneNumber = decrypt(v.phoneNumber));
                    v.employeeProfile != null && (v.employeeProfile = decrypt(v.employeeProfile));
                    v.salary != null && Object.prototype.toString.call(v.salary) === '[object Array]' &&  (v.salary.map(e => {
                        e.money = decrypt(e.money);
                        e.time = decrypt(e.time);
                        return e;
                    }));
                }
                catch(err)
                {
                    console.error('decrypt error ', err);
                    console.error('decrypt error data', v);
                }
                
            });
            break;
        case CGI_NAME_LIST.QUERY_ADMIN_LIST:
            data.data.forEach(v => {
                try{
                    v.admin != null && (v.admin = decrypt(v.admin));
                    v.passwork != null && (v.passwork = decrypt(v.passwork));
                }
                catch(err)
                {
                    console.error('decrypt error ', err);
                    console.error('decrypt error data', v);
                }
                
            });
            break;
        
        default:
            break;
    }
    return data;
}