from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
import pandas as pd
import rpy2.robjects as robjects
from rpy2.robjects.packages import importr

app = Flask(__name__)
CORS(app, support_credentials=True)

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

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
        'average_rounds': float(df5['Max_round'])
         }

    return jsonify(dic)

@app.route('/abps',methods=['GET'])
def r_function():
    rstring = """
    function(hct,hgb,mch,mchc,mcv,rbc,retp){

        library(ABPS)
        x=ABPS(HCT=as.numeric(hct), HGB=as.numeric(hgb), MCH=as.numeric(mch), MCHC=as.numeric(mchc), MCV=as.numeric(mcv), RBC=as.numeric(rbc), RETP=as.numeric(retp))
        return(x)
    }
    """
    rfunc = robjects.r(rstring)
    r_df = rfunc(1,2,3,4,5,6,7)
    print(r_df)
    return jsonify('Done')


if __name__ == '__main__':
    app.run()
