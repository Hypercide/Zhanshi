<?php
$config = array (	
		//应用ID,您的APPID。
		'app_id' => "2016092800614807",

		//商户私钥
		'merchant_private_key' => "MIIEowIBAAKCAQEAp8zRSLZwQn7LfLb9+H+s/CkQCl9CtpDUyowJq+1SXuRm7TuEnWuf34CemkV5IQ2A87cXsp1EaOUUDJqOWHBEQBbXdCs2U6yGCX4L3fyTr3DaDxcwfHtTGsWQFwnpKEPVVApPUNuVmTrkXTRMZEQR85imAYKvSAn1eDmVWAuyR+MaftZcrcop4nfs/NV1o3KA9XhVeRddBcNYJq8Mgf3/jCgsDb/3eF6U42tDgSyFs+SpPe7n7T7TVCDqz2Or+8IFi9uSkCIyPyQakJ/nqjlkldOTr8RlW2Nxz1g0jvNpJzOoYifs847ovR1sTPSw8vxX4wyVFjQKiRhG4dXnFOdjRQIDAQABAoIBAGSe4kSq+cg2Bkmj5cmUriOLcA34L6YQVTmcHdSV/BXg+oN5dD19oyHAG9tAm7EhStlaSoCV48bOz2X7bC5GK/cOe2Yy32Hvi3S3u+ACrIDAuFHiQvXycdQU8iGOlNzLSGobwJIpCp0W/oeRa9mYI/eh6rHvLrKRHjxYs2BXqzGFWfL5cZ6aqcZdebSEMjSKYE+4FqDPzdIjC37fwhLFYAqoXj9Y0Ge/L1l+lOMeIM9X/yW8Mlq2v+ToGJurFbJ7c9afaLfSKwKIQH9owN6YASw3ZScoQns5ltuh5R5aG/0RgWsUMysODPNC5oSGAW/PrwrmWedp1zPeFCS2mLXdESECgYEA0QWKgYF5gXnE1/EII42J1tWkFsfOYRNVqWyT8hBaqgOdqWkYrPgp6kQoPumLCtuwrIguU90MYlhrk5gLl49qYZpsPDJhmDezg8FZXiXEz1wDa2eJHg0sGSsS9y0vdz4i5czsrBjuq7ZYDUkLX4b2Sw/YGbTWcZw1hjs8bg+E2P0CgYEAzYODtGaHwIze/LjnSbQdTnMugmUUYnydPQDXa+gTWKjyQxEbeq0GnFoHnOHfYL0+Al2ytzUvCyL2d0YexAw86s9nQEZzslQucbG2b4RicvJmtCaOotbgVgjZyKctxz99/IJydZCfpu6ADIRmWeKS9XfLtZ/+kkAOhWflWM/hCekCgYA2VLVi4k++CvPSmZFfBGxezlt/nGIVs5vhlRqDoiKe7J+vqGTEmSD0BtFbQQNmSCKNRjyciemtKoST8cKZm6qwQh5+Ky5ZDal4xuo+4ZxdtfIhmeD3Ub8zr5GXdERRP3J8vx6JwVVQhu4uTd1J8F/WtQCb9fiDwXHcOUuE5D3I1QKBgQCrsMZ0DQA2dbnIyjS3l1iwdHuThhx8lvzJvQ07Ydvfwuz56K3bU/fk4TXg87apXBAU6/BlLHJLzH65cIQ9ZrfxtyncQb9gaQGQDFaMXb3dp/LzaA7brcYnOievgTM2dS2sqdIzs4odbLzfODFFwIrjtZwi9TI5PnijLQQmqSypGQKBgDaRxorHqzfXx/vh2K/8njCoiE1mMzcHAcHHuF1CCEW+TxhaH4/h+VJu1VElUe84DalSqVBUo1uDy0H2QQ06F/t2tZTIgy1A3NH4LnNKYcpMpvZ3a7ZTr72sUHRXuMa5uQEyeQzjPGR7XX2Js2+AICSdp2U8HYn+DpkbdsuVJtjT",
		
		//异步通知地址
		'notify_url' => "http://外网可访问网关地址/alipay.trade.page.pay-PHP-UTF-8/notify_url.php",
		
		//同步跳转
		'return_url' => "http://外网可访问网关地址/alipay.trade.page.pay-PHP-UTF-8/return_url.php",

		//编码格式
		'charset' => "UTF-8",

		//签名方式
		'sign_type'=>"RSA2",

		//支付宝网关
		'gatewayUrl' => "https://openapi.alipaydev.com/gateway.do",

		//支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
		'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuQ0Yb+euvPaMRRzYschlk8apP/4waZvMyDAmUC5eIUgMT12xvakFG5X/6tJWZXWW6+NSMDlQFVgS8rzMRwZKSsf/03jF9VaUDKGqTRuyI924AzZGXsJppHKWvmw++0MnxN7DWVklrPRXUCQbOD37zFTCc1yzeJKCoT7rms5JnkXdrlSfavRWKNBshVITJ9QnKadI9y4BpBcPCan4HF1raLj0NWzegq0XWlTMfg+ajj532Os5J9ErczfBALH+7T1TFC7wLDwnAp0L/Mus0Lis5t1nQYIxyYRIH00O0AbN3Ga8zvAgyCg7OxQ577B3Xryw6MDXdrVdwbgZkVa/+gVJaQIDAQAB",
);