import * as crypto from 'crypto';
export function md5sign(content) {
  const md5 = crypto.createHash('md5');
  md5.update(content);
  const sign = md5.digest('hex');
  return sign;
}

export function md5verify(content) {
  return crypto
    .createHash('md5')
    .update(content, 'utf8')
    .digest('hex');
}
export function aesEncrypt(data, key = 'password') {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function aesDecrypt(encrypted, key = 'password') {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
