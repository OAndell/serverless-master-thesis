import subprocess
import time
import json

def open_artillery_output():
    with open('output.json') as json_file:
        return json.load(json_file)

def save_results(data):
    with open('results.json', 'w') as outfile:
        json.dump(data, outfile, indent=4)    

def open_results():
    with open('results.json', 'rb') as json_file:
        return json.load(json_file)

def insert_value(key, results_dict, output):
    results_dict[key].append({
        "timestamp": output['aggregate']['timestamp'],
        "scenario_duration": output['aggregate']['scenarioDuration']['median'],
        "rt_endpoint" : output['aggregate']['customStats']
    })
    return results_dict



results_dict = open_results()

while True:

    #Record Cold-start
    subprocess.run(['artillery run --config serverless_nozip_config.yml scenario2.yml -o output.json'], shell=True, stdout=subprocess.PIPE)
    output = open_artillery_output()
    results_dict = insert_value("coldstart_nozip", results_dict, output)
    save_results(results_dict)

    print("coldstart_nozip")
    
    time.sleep(1)
    #Record Warm-start
    subprocess.run(['artillery run --config serverless_nozip_config.yml scenario2.yml -o output.json'], shell=True, stdout=subprocess.PIPE)
    output = open_artillery_output()
    results_dict = insert_value("warmstart_nozip", results_dict, output)
    save_results(results_dict)

    print("warmstart_nozip")


    time.sleep(1)
     #Record cold-start
    subprocess.run(['artillery run --config serverless_zip_config.yml scenario2.yml -o output.json'], shell=True, stdout=subprocess.PIPE)
    output = open_artillery_output()
    results_dict = insert_value("coldstart_zip", results_dict, output)
    save_results(results_dict)

    print("coldstart_zip")

    time.sleep(1)
    #Record cold-start
    subprocess.run(['artillery run --config serverless_zip_config.yml scenario2.yml -o output.json'], shell=True, stdout=subprocess.PIPE)
    output = open_artillery_output()
    results_dict = insert_value("warmstart_zip", results_dict, output)
    save_results(results_dict)

    print("warmstart_zip")

    time.sleep(1)
    #Record ms Cold
    subprocess.run(['artillery run --config msconfig.yml scenario2_mono.yml -o output.json'], shell=True, stdout=subprocess.PIPE)
    output = open_artillery_output()
    results_dict = insert_value("coldstart_ms", results_dict, output)
    save_results(results_dict)

    time.sleep(1)
    #Record MS warm
    subprocess.run(['artillery run --config msconfig.yml scenario2_mono.yml -o output.json'], shell=True, stdout=subprocess.PIPE)
    output = open_artillery_output()
    results_dict = insert_value("warmstart_ms", results_dict, output)
    save_results(results_dict)


    time.sleep(1)
    #Record Monolith
    subprocess.run(['artillery run --config mono_config.yml scenario2_mono.yml -o output.json'], shell=True, stdout=subprocess.PIPE)
    output = open_artillery_output()
    results_dict = insert_value("monolith", results_dict, output)
    save_results(results_dict)

    print("monolith")


    print("waiting")
    time.sleep(1600)



