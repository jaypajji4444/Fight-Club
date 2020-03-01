from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
import pandas as pd
import numpy as np
import json
import rpy2.robjects as robjects
from rpy2.robjects.packages import importr
from twilio.rest import Client

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

app = Flask(__name__)
CORS(app, support_credentials=True)

df3=pd.read_csv('data3.csv')
df4=df3

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/shutdown', methods=['GET'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'

@app.route('/player_data',methods=['POST'])
def player():
    name=request.form.get('name')
    #name='Alistair Overeem'
    df5 = df3[df3['B_Name'] == name]

    dic= {
        'body_strike': [[float(df5['B__Round1_Strikes_Body Significant Strikes_Attempts']),float(df5['B__Round2_Strikes_Body Significant Strikes_Attempts']),float(df5['B__Round3_Strikes_Body Significant Strikes_Attempts']),float(df5['B__Round4_Strikes_Body Significant Strikes_Attempts']),float(df5['B__Round5_Strikes_Body Significant Strikes_Attempts'])], [float(df5['B__Round1_Strikes_Body Significant Strikes_Landed']),float(df5['B__Round2_Strikes_Body Significant Strikes_Landed']),float(df5['B__Round3_Strikes_Body Significant Strikes_Landed']),float(df5['B__Round4_Strikes_Body Significant Strikes_Landed']),float(df5['B__Round5_Strikes_Body Significant Strikes_Landed'])]],
        'significant_kick': [[float(df5['B__Round1_Strikes_Clinch Significant Kicks_Attempts']),float(df5['B__Round2_Strikes_Clinch Significant Kicks_Attempts']),float(df5['B__Round3_Strikes_Clinch Significant Kicks_Attempts']),float(df5['B__Round4_Strikes_Clinch Significant Kicks_Attempts']),float(df5['B__Round5_Strikes_Clinch Significant Kicks_Attempts'])], [float(df5['B__Round1_Strikes_Clinch Significant Kicks_Landed']),float(df5['B__Round2_Strikes_Clinch Significant Kicks_Landed']),float(df5['B__Round3_Strikes_Clinch Significant Kicks_Landed']),float(df5['B__Round4_Strikes_Clinch Significant Kicks_Landed']),float(df5['B__Round5_Strikes_Clinch Significant Kicks_Landed'])]],
        'significant_punches': [[float(df5['B__Round1_Strikes_Clinch Significant Punches_Attempts']), float(df5['B__Round2_Strikes_Clinch Significant Punches_Attempts']),float(df5['B__Round3_Strikes_Clinch Significant Punches_Attempts']),float(df5['B__Round4_Strikes_Clinch Significant Punches_Attempts']),float(df5['B__Round5_Strikes_Clinch Significant Punches_Attempts'])],[float(df5['B__Round1_Strikes_Clinch Significant Punches_Landed']), float(df5['B__Round2_Strikes_Clinch Significant Punches_Landed']),float(df5['B__Round3_Strikes_Clinch Significant Punches_Landed']),float(df5['B__Round4_Strikes_Clinch Significant Punches_Landed']),float(df5['B__Round5_Strikes_Clinch Significant Punches_Landed'])]],
        'distance_body_kicks': [[float(df5['B__Round1_Strikes_Distance Body Kicks_Attempts']),float(df5['B__Round2_Strikes_Distance Body Kicks_Attempts']),float(df5['B__Round3_Strikes_Distance Body Kicks_Attempts']),float(df5['B__Round4_Strikes_Distance Body Kicks_Attempts']),float(df5['B__Round5_Strikes_Distance Body Kicks_Attempts'])],[float(df5['B__Round1_Strikes_Distance Body Kicks_Landed']),float(df5['B__Round2_Strikes_Distance Body Kicks_Landed']),float(df5['B__Round3_Strikes_Distance Body Kicks_Landed']),float(df5['B__Round4_Strikes_Distance Body Kicks_Landed']),float(df5['B__Round5_Strikes_Distance Body Kicks_Landed'])]],
        'distance_body_punches':[[float(df5['B__Round1_Strikes_Distance Body Punches_Attempts']),float(df5['B__Round2_Strikes_Distance Body Punches_Attempts']),float(df5['B__Round3_Strikes_Distance Body Punches_Attempts']),float(df5['B__Round4_Strikes_Distance Body Punches_Attempts']),float(df5['B__Round5_Strikes_Distance Body Punches_Attempts'])],[float(df5['B__Round1_Strikes_Distance Body Punches_Landed']),float(df5['B__Round2_Strikes_Distance Body Punches_Landed']),float(df5['B__Round3_Strikes_Distance Body Punches_Landed']),float(df5['B__Round4_Strikes_Distance Body Punches_Landed']),float(df5['B__Round5_Strikes_Distance Body Punches_Landed'])]],
        'head_kicks': [[float(df5['B__Round1_Strikes_Distance Head Kicks_Attempts']),float(df5['B__Round2_Strikes_Distance Head Kicks_Attempts']),float(df5['B__Round3_Strikes_Distance Head Kicks_Attempts']),float(df5['B__Round4_Strikes_Distance Head Kicks_Attempts']),float(df5['B__Round5_Strikes_Distance Head Kicks_Attempts'])],[float(df5['B__Round1_Strikes_Distance Head Kicks_Landed']),float(df5['B__Round2_Strikes_Distance Head Kicks_Landed']),float(df5['B__Round3_Strikes_Distance Head Kicks_Landed']),float(df5['B__Round4_Strikes_Distance Head Kicks_Landed']),float(df5['B__Round5_Strikes_Distance Head Kicks_Landed'])]],
        'head_punches':[[float(df5['B__Round1_Strikes_Distance Head Punches_Attempts']),float(df5['B__Round2_Strikes_Distance Head Punches_Attempts']),float(df5['B__Round3_Strikes_Distance Head Punches_Attempts']),float(df5['B__Round4_Strikes_Distance Head Punches_Attempts']),float(df5['B__Round5_Strikes_Distance Head Punches_Attempts'])],[float(df5['B__Round1_Strikes_Distance Head Punches_Landed']),float(df5['B__Round2_Strikes_Distance Head Punches_Landed']),float(df5['B__Round3_Strikes_Distance Head Punches_Landed']),float(df5['B__Round4_Strikes_Distance Head Punches_Landed']),float(df5['B__Round5_Strikes_Distance Head Punches_Landed'])]],
        'ground_head_strikes': [[float(df5['B__Round1_Strikes_Ground Head Strikes_Attempts']),float(df5['B__Round2_Strikes_Ground Head Strikes_Attempts']),float(df5['B__Round3_Strikes_Ground Head Strikes_Attempts']),float(df5['B__Round4_Strikes_Ground Head Strikes_Attempts']),float(df5['B__Round5_Strikes_Ground Head Strikes_Attempts'])],[float(df5['B__Round1_Strikes_Ground Head Strikes_Landed']),float(df5['B__Round2_Strikes_Ground Head Strikes_Landed']),float(df5['B__Round3_Strikes_Ground Head Strikes_Landed']),float(df5['B__Round4_Strikes_Ground Head Strikes_Landed']),float(df5['B__Round5_Strikes_Ground Head Strikes_Landed'])]],
        'knocked_down_landed': [float(df5['B__Round1_Strikes_Knock Down_Landed']),float(df5['B__Round2_Strikes_Knock Down_Landed']),float(df5['B__Round3_Strikes_Knock Down_Landed']),float(df5['B__Round4_Strikes_Knock Down_Landed']),float(df5['B__Round5_Strikes_Knock Down_Landed'])],
        'ground_time': [float(df5['B__Round1_TIP_Ground Time']),float(df5['B__Round2_TIP_Ground Time']),float(df5['B__Round3_TIP_Ground Time']),float(df5['B__Round4_TIP_Ground Time']),float(df5['B__Round5_TIP_Ground Time'])],
        'guard_control_time': [float(df5['B__Round1_TIP_Guard Control Time']),float(df5['B__Round2_TIP_Guard Control Time']),float(df5['B__Round3_TIP_Guard Control Time']),float(df5['B__Round4_TIP_Guard Control Time']),float(df5['B__Round5_TIP_Guard Control Time'])],
        'standing_time': [float(df5['B__Round1_TIP_Standing Time']),float(df5['B__Round2_TIP_Standing Time']),float(df5['B__Round3_TIP_Standing Time']),float(df5['B__Round4_TIP_Standing Time']),float(df5['B__Round5_TIP_Standing Time'])],
        'average_rounds': float(df5['Max_round']),
        'Name':str(df5['B_Name']),
        'Average_streak': float(df5['BStreak']),
        'Age': float(df5['B_Age']),
        'Height': float(df5['B_Height'])
         }

    return jsonify(dic)

@app.route('/abps',methods=['POST'])
def r_function():
    hct=request.form.get('hct')
    hgb=request.form.get('hgb')
    mch=request.form.get('mch')
    mchc=request.form.get('mchc')
    mcv=request.form.get('mcv')
    rbc=request.form.get('rbc')
    retp=request.form.get('retp')
    rstring = """
    function(hct,hgb,mch,mchc,mcv,rbc,retp){
        
        library(ABPS)
        x=ABPS(HCT=as.numeric(hct), HGB=as.numeric(hgb), MCH=as.numeric(mch), MCHC=as.numeric(mchc), MCV=as.numeric(mcv), RBC=as.numeric(rbc), RETP=as.numeric(retp))
        return(x)
    }
    """
    rfunc = robjects.r(rstring)
    
    r_df = rfunc(hct,hgb,mch,mchc,mcv,rbc,retp)
    #pd.rpy2.common.convert_robj(r_df)
    vector=np.asarray(r_df)
    #print(type(vector))
    if(float(vector[0])>0):
        account_sid = #####Add your credentials
        auth_token = #####Add your credentials
        client = Client(account_sid, auth_token)

        message = client.messages.create(
        from_='#########',
        body='Uh oh! You just got tagged for doping!',
        to='#########'
        )

        print(message.sid)
    return jsonify({'value':float(vector[0])})



if __name__ == '__main__':
    app.run()
