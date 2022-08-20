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
conn = mysql.connector.connect(user = 'root',
                                password = 'zweihander995',
                                host = 'localhost',
                                database = 'disp_moviles')


app = Sanic(name="APIbuilding")
@app.route('/')
async def main(request):
    return json({'hello': 'world'})

@app.route('/confirmMail')
async def confirm(request):
    conn = mysql.connector.connect(user = 'root',
                                password = 'zweihander995',
                                host = 'localhost',
                                database = 'disp_moviles')
    cursorObject = conn.cursor()

    correo = request.args.get("correo")
    query = "SELECT numero_verif FROM users WHERE correos = '"+correo+"';"
    cursorObject.execute(query)
    server_number = str(cursorObject.fetchall()[0][0])
    # print("------------------------------------------------")
    # print(server_number)
    # conn.close()
    if server_number == request.args.get("verif_number"):

        sql = "update users set status_verif = 'CONFIRMED' where correos = '"+correo+"';"
        cursorObject.execute(sql)
        conn.commit()
        conn.close()
        return json({"numbers match":"verified"})
    else:
        conn.close()
        return json({"no match":"no changes"})

@app.route('/userInfo')
async def userInfo(request):
    if request.args.get("password") == request.args.get("confirmpassword"):
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

        mycursor = conn.cursor()
        sql = "INSERT INTO users (correos, contras, numero_verif, status_verif) VALUES ('"+request.args.get("correo")+"','"+request.args.get("password")+"',"+str(verifCode)+",'NOT-CONFIRMED')"
        print(sql)
        mycursor.execute(sql)
        conn.commit()
        conn.close()

        return json({"passwords match":"mail sent"})
    else:
        return json({"Error:":"passwords don't match"})

if __name__ == '__main__':
    app.run(host='localhost', port=8000)