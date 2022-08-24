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

def sqlQuery(query):
    conn = mysql.connector.connect(user = 'root',
                                password = 'zweihander995',
                                host = 'localhost',
                                database = 'disp_moviles')
    cursorObject = conn.cursor()
    cursorObject.execute(query)
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
    
    if correo == "None":
        abortRequest = 1
        return json({"fail":"no password specified"},headers={"Access-Control-Allow-Origin": "*"})

    if abortRequest == 0:
        query = "SELECT contras FROM users WHERE correos = '"+correo+"';"
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
     
    # sql = "INSERT INTO users (correos, contras, numero_verif, status_verif) VALUES ('"+request.args.get("correo")+"','"+request.args.get("password")+"','"+str(verifCode)+"','NOT-CONFIRMED');"


    sql = "INSERT INTO users (correos, contras, numero_verif, status_verif) VALUES ('usuario2@mail.com','password','000011','NOT-CONFIRMED');"
    print(sql)
    queryResult = sqlQuery(sql)
    print(queryResult)
    return json({"under construction":"under construction"},headers={"Access-Control-Allow-Origin": "*"})

if __name__ == '__main__':
    app.run(host='172.26.5.244', port=8000)

# @app.route('/confirmMail')
# async def confirm(request):
#     correo = request.args.get("correo")
#     query = "SELECT numero_verif FROM users WHERE correos = '"+correo+"';"
#     cursorObject.execute(query)
#     server_number = str(cursorObject.fetchall()[0][0])
#     # print("------------------------------------------------")
#     # print(server_number)
#     # conn.close()
#     if server_number == request.args.get("verif_number"):
# 
#         sql = "update users set status_verif = 'CONFIRMED' where correos = '"+correo+"';"
#         cursorObject.execute(sql)
#         return json({"numbers match":"verified"})
#     else:
#         return json({"no match":"no changes"})
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


