# -*- coding: utf-8 -*-

# Oi! Remember to use "screen" before launching this on Lightsail!
# To deattach the "screen", "ctrl-a" then "d"
# To reattach it, "screen -r"


from os import abort
from sanic import Sanic
from sanic.response import json
import boto3
from botocore.exceptions import ClientError
import random
SENDER = "feuerschwert995@gmail.com"
RECIPIENT = "feuerschwert995@gmail.com"
AWS_REGION = "us-east-1"
SUBJECT = "Verifica tu correo electrónico"
CHARSET = "UTF-8"
import mysql.connector
app = Sanic(name="APIbuilding")
ssl = {
    "cert": "/etc/letsencrypt/live/skyclad.xyz/fullchain.pem",
    "key": "/etc/letsencrypt/live/skyclad.xyz/privkey.pem",
}




def sqlQuery(query):
    conn = mysql.connector.connect(user = 'root',
                                password = 'zweihander995',
                                host = 'localhost',
                                database = 'disp_moviles')
    cursorObject = conn.cursor()
    cursorObject.execute(query)

    if query[0:6] == "INSERT":
        conn.commit()

    if query[0:6] == "UPDATE":
        conn.commit()

    queryResult = cursorObject.fetchall()
    conn.close()
    return queryResult


@app.route('/')
async def main(request):
    return json({'hello': 'world'})


@app.route('/loginRequest')
async def confirm(request):
    correo = str(request.args.get("correo"))
    password = str(request.args.get("password"))

    abortRequest = 0
    if correo == "None":
        abortRequest = 1
        return json({"fail":"no user specified"},headers={"Access-Control-Allow-Origin": "*"})
    
    if password == "None":
        abortRequest = 1
        return json({"fail":"no password specified"},headers={"Access-Control-Allow-Origin": "*"})

    if abortRequest == 0:
        query = "SELECT contras FROM users WHERE correos = '"+correo+"' AND status_verif = 'CONFIRMED';"
        queryResult = sqlQuery(query)

        print("Login request for user "+correo+"...")

        if queryResult == []:
            print("user "+correo+" does not exist")
            return json({"fail":"user does not exist"},headers={"Access-Control-Allow-Origin": "*"})

        if password == queryResult[0][0]:
            print("passwords match.")
            return json({"ok":"password match"},headers={"Access-Control-Allow-Origin": "*"})
        else:
            print("password mismatch.")
            return json({"fail":"password mismatch"},headers={"Access-Control-Allow-Origin": "*"})


@app.route('/signUpRequest')
async def confirm(request):
    verifCode=random.randint(100000,999999)
    BODY_HTML = """<html>
    <head></head>
    <body>
    <h1>"""+SUBJECT+"""</h1>
    <p> Tu código de verificación es: <b>"""+str(verifCode)+""" </b>.<br> <br>
    </p>
    </body>
    </html>
    """
    
    # Send Email
    client = boto3.client('ses',region_name=AWS_REGION)
    try:
       response = client.send_email(
       Destination={'ToAddresses': [RECIPIENT,],},
       Message={'Body':{'Html': {'Charset': CHARSET,'Data': BODY_HTML,},'Text': {'Charset': CHARSET,'Data': "",},},'Subject':{'Charset': CHARSET,'Data': SUBJECT,},},Source=SENDER,)
       print ("sending mail...")
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
    
    query = "INSERT INTO users (correos, contras, numero_verif, status_verif) VALUES ('"+request.args.get("correo")+"','"+request.args.get("password")+"','"+str(verifCode)+"','NOT-CONFIRMED');"
    print(query)
    queryResult = sqlQuery(query)
    print(queryResult)
    return json({"under construction":"under construction"},headers={"Access-Control-Allow-Origin": "*"})

@app.route('/confirmMail')
async def confirm(request):
    correo = request.args.get("correo")
    query = "SELECT numero_verif FROM users WHERE correos = '"+correo+"';"
    queryResult = sqlQuery(query)
    server_number = str(queryResult[0][0])
    if server_number == request.args.get("verif_number"):

        query = "UPDATE users set status_verif = 'CONFIRMED' where correos = '"+correo+"';"
        sqlQuery(query)
        return json({"new_status":"verified"},headers={"Access-Control-Allow-Origin": "*"})
    else:
        return json({"new_status":"not_verified"},headers={"Access-Control-Allow-Origin": "*"})

if __name__ == '__main__':
    app.run(host='172.26.5.244', port=8443, ssl=ssl)

# 
# @app.route('/userInfo')
# async def userInfo(request):
#     if request.args.get("password") == request.args.get("confirmpassword"):
#         verifCode=random.randint(100000,999999)
#         BODY_HTML = """<html>
#         <head></head>
#         <body>
#         <h1>"""+SUBJECT+"""</h1>
#         <p> Tu código de verificación es: <b>"""+str(verifCode)+""" </b>.<br> <br>
#         </p>
#         </body>
#         </html>
#         """
# 
#         client = boto3.client('ses',region_name=AWS_REGION)
#         try:
#            response = client.send_email(
#            Destination={'ToAddresses': [RECIPIENT,],},
#            Message={'Body':{'Html': {'Charset': CHARSET,'Data': BODY_HTML,},'Text': {'Charset': CHARSET,'Data': "",},},'Subject':{'Charset': CHARSET,'Data': SUBJECT,},},Source=SENDER,)
#            print ("sending mail...")
#         except ClientError as e:
#             print(e.response['Error']['Message'])
#         else:
#             print("Email sent! Message ID:"),
#             print(response['MessageId'])
# 
#         sql = "INSERT INTO users (correos, contras, numero_verif, status_verif) VALUES ('"+request.args.get("correo")+"','"+request.args.get("password")+"',"+str(verifCode)+",'NOT-CONFIRMED')"
#         print(sql)
#         cursorObject.execute(sql)
# 
#         return json({"passwords match":"mail sent"})
#     else:
#         return json({"Error:":"passwords don't match"})


