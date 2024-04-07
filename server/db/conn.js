const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: process.env.aiven_pass,
    host: process.env.aiven_host,
    port: 20398,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUT73tJ8AS8yFoed8vCip/NS6uRRMwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNGQ3ZDM3OWYtYTM2OC00MDNlLTliOGItNGQ0ZWY2MzQ0
YTEyIFByb2plY3QgQ0EwHhcNMjQwMzMxMTA1OTQ5WhcNMzQwMzI5MTA1OTQ5WjA6
MTgwNgYDVQQDDC80ZDdkMzc5Zi1hMzY4LTQwM2UtOWI4Yi00ZDRlZjYzNDRhMTIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKu9rQup
HW5oYBlEki1hVkH1rFuAUHwrenyqsNwufN7UoG3FNFscDUB2eWTG4UQbDTU27KQl
c3gQudSuknsR+djUDQlcSdyDEu57//SxREzKArpv7NNoWxL4HgreY790Nd5mbSe3
E2qfb/GJB4P20pqivi2/wSwbgbupGgRHMAoOz1S52UQ3lUik5Nc1gVzbejL+pJ+o
LeC/updjAdUqJ3CLFASjTVCWbKOB+AtGJPGo3UAW8v73UBjH314JE1WONRSfqz4r
zUefDxuPQrlFyF8A/wH6ljZPtfklLxutXiQl1WJW0zGHHTaazSDI9n3L0bg+8FzT
/7BVqTZmtlfk3wPvdULAtQNyuwJY2dcXAVTK77zgwczwGkEP819fZ0x3JFCKGP/n
h1O+jjBq56jYG4pEE1jB2zpFL5R1I6iLbGLVpay60v/v8NuLyeq6nDmKpR/RZ3t3
2yKFR5peFPW0QlLYk3dDKHdIRmZY2rnoz40gz+if1U280tTXWVk0nZDWLwIDAQAB
oz8wPTAdBgNVHQ4EFgQUl+7JXKHpvywU/b2UQfyfM19r+sIwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAG5KzDvOEizddOmU
vJTBoCg1ui4+Z7F4tPzkQJe/erBayqhfIhKpI9vfATnDprTxQxQTDcHdott/QX+I
8Ae08bit/D/+yzQXcBvmOTCUOzUcmf33nhq9R7lmywhK+U/i4ayIS4sk5IaWypgt
ERYFCB3sIqFErb+czj2IfWJr1u+ssqQFT7AVH2v0m+EKro+cr8mBvbQXekkZ3J57
THsBKRlKwXOxibqdD6EsuDOaG0WuBNKkDv4BncwNrkO575PyYLtflFMnFjoXnKNc
VFqSTgjyp/YmH6i4+pUhzia0m0CafVrTHFRxb63fCSGde2zeaQpGFpcE7vf3IrF4
sZuMQ+TX4GjFvu6jGDvBlmhDHnz0VW9dpGbBuPZvRuFhP9IPi9XBbS5bKMnPhEud
ohN6COKgOUR/nfgPNNpUi5mxDCyq1GYBFNpN82SDEoLVOXmyHP+EUpftVsC+oeOp
SV/SaD7+CN1BOSb/n30TEgSYwe5Q+OzRJ3jVfrM8THGHuaom0w==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    console.log("aiven connected");
    // client.query(`update flame set classicalrating = '1245' where flameid = '1'`, [], function (err, result) {
    //     if (err)
    //         throw err;

    //     console.log(result.rows);
    // });
});
module.exports = client;