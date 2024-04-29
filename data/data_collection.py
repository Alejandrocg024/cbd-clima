#----------------------------------------------------------------------------------------------------------#
#----------------------------------------- IMPORTACIONES --------------------------------------------------#
#----------------------------------------------------------------------------------------------------------#

import os
import requests
import pandas as pd

#----------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------#


#----------------------------------------------------------------------------------------------------------#
#-------------------------------- MÉTODOS PARA EL CONSUMO DE APIS -----------------------------------------#
#----------------------------------------------------------------------------------------------------------#

def get_cities_coordinates(file_path):
    """
    Devuelve un diccionario con las ciudades como claves y sus coordenadas como valores.

    ENTRADA:
    file_path: str
        Ruta del archivo con las coordenadas de las ciudades.

    SALIDA:
    cities_coordinates: dict
        Diccionario con las ciudades y sus coordenadas.
    """
    df = pd.read_excel(file_path, engine="openpyxl")

    cities_coordinates = {row["city"]: (row["latitude"], row["longitude"]) for index, row in df.iterrows()}

    return cities_coordinates


def get_weather_data(cities, api_key, api_endpoint, api_host, columns, start_date, end_date, file_name):
    """
    Genera un Excel con los datos meteorológicos de las ciudades.

    Se usa la API de Meteostat para obtener los datos meteorológicos.

    ENTRADA:
    cities: dict
        Diccionario con las ciudades y sus coordenadas.
    api_key: str
        Clave de la API.
    api_endpoint: str
        URL del endpoint de la API.
    api_host: str
        Host de la API.
    columns: list
        Lista con el nombre de las columnas del Excel.
    start_date: str
        Fecha de inicio de los datos meteorológicos.
    end_date: str
        Fecha de fin de los datos meteorológicos.
    file_name: str
        Nombre del archivo Excel.

    SALIDA:
    None
    """
    final_data = []

    for city, coordinates in cities.items():
        latitude, longitude = coordinates

        querystring = {
            "lat": latitude,
            "lon": longitude,
            "start": start_date,
            "end": end_date
        }

        headers = {
            "X-RapidAPI-Key": api_key,
            "X-RapidAPI-Host": api_host
        }

        response = requests.get(api_endpoint, headers=headers, params=querystring)
        data = response.json()

        for weather_data in data["data"]:
            
            weather_data_values = list(weather_data.values())
            weather_data_values.insert(0, city)

            final_data.append(tuple(weather_data_values))

    df = pd.DataFrame(final_data, columns=columns)

    path = os.path.join("data/data_files", file_name)

    df.to_excel(path, index=False)

    print("Datos meteorológicos guardados en:", path)


def get_air_quality_data(cities, api_key, api_endpoint, api_host, columns, file_name):
    """
    Genera un Excel con los datos de calidad del aire de las ciudades.

    Se usa la API de Air Quality para obtener los datos de calidad del aire.

    ENTRADA:
    cities: dict
        Diccionario con las ciudades y sus coordenadas.
    api_key: str
        Clave de la API.
    api_endpoint: str
        URL del endpoint de la API.
    api_host: str
        Host de la API.
    columns: list
        Lista con el nombre de las columnas del Excel.
    file_name: str
        Nombre del archivo Excel.

    SALIDA:
    None
    """
    final_data = []

    for city, coordinates in cities.items():
        latitude, longitude = coordinates

        querystring = {
            "lon": longitude,
            "lat": latitude
        }

        headers = {
            "X-RapidAPI-Key": api_key,
	        "X-RapidAPI-Host": api_host
        }

        response = requests.get(api_endpoint, headers=headers, params=querystring)
        data = response.json()

        for air_quality_data in data["data"]:
            
            air_quality_data_values = list(air_quality_data.values())
            air_quality_data_values.insert(0, city)

            final_data.append(tuple(air_quality_data_values))

    df = pd.DataFrame(final_data, columns=columns)

    path = os.path.join("data/data_files", file_name)

    df.to_excel(path, index=False)

    print("Datos de calidad del aire guardados en:", path)


def get_koppen_climate_classification(cities, api_key, api_endpoint, api_host, columns, file_name):
    """
    Genera un Excel con las clasificaciones climáticas de Köppen de las ciudades.

    ENTRADA:
    cities: dict
        Diccionario con las ciudades y sus coordenadas.
    api_key: str
        Clave de la API.
    api_endpoint: str
        URL del endpoint de la API.
    api_host: str
        Host de la API.
    columns: list
        Lista con el nombre de las columnas del Excel.
    file_name: str
        Nombre del archivo Excel.

    SALIDA:
    None
    """
    final_data = []

    for city, coordinates in cities.items():
        latitude, longitude = coordinates

        querystring = {
            "lon": longitude,
            "lat": latitude
        }

        headers = {
            "X-RapidAPI-Key": api_key,
	        "X-RapidAPI-Host": api_host
        }

        response = requests.get(api_endpoint, headers=headers, params=querystring)
        data = response.json()

        if "classification" not in data:
            final_data.append((city, ""))
        else:
            final_data.append((city, data["classification"]))

    df = pd.DataFrame(final_data, columns=columns)

    path = os.path.join("data/data_files", file_name)

    df.to_excel(path, index=False)

    print("Clasificación Koppen guardada en:", path)


def transform_all_excel_to_csv(folder_path):
    """
    Genera archivos CSV a partir de archivos Excel en una carpeta.

    ENTRADA:
    folder_path: str
        Ruta de la carpeta con los archivos Excel.

    SALIDA:
    None
    """
    if not os.path.isdir(folder_path):
        raise Exception("La carpeta no es un directorio.")
    
    files = os.listdir(folder_path)

    excel_files = [file for file in files if file.endswith(".xlsx") or file.endswith(".xls")]

    for file in excel_files:
        excel_data = pd.read_excel(os.path.join(folder_path, file))

        csv_file = os.path.splitext(file)[0] + ".csv"

        excel_data.to_csv(os.path.join(folder_path, csv_file), index=False)

        print("Archivo CSV generado:", csv_file)


def transform_excel_to_csv(file_path):
    """
    Genera un archivo CSV a partir de un fichero de Excel.

    ENTRADA:
    file_path: str
        Ruta del fichero Excel.

    SALIDA:
    None
    """
    if not os.path.isfile(file_path):
        raise Exception("El archivo no es un fichero.")
    
    excel_data = pd.read_excel(file_path)

    csv_file = os.path.splitext(file_path)[0] + ".csv"

    excel_data.to_csv(csv_file, index=False)

    print("Archivo CSV generado:", csv_file)

#----------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------------------------------#




#----------------------------------------------------------------------------------------------------------#
#-------------------------------------- EJEUCIÓN DEL CÓDIGO -----------------------------------------------#
#----------------------------------------------------------------------------------------------------------#

#-- Variables generales -----------------------------------------------------------------------------------#
cities_coordinates = get_cities_coordinates("data/data_files/city.xlsx")
api_key_1 = "Introducir clave de la API"
api_key_2 = "Introducir clave de la API"
api_key_3 = "Introducir clave de la API"
#----------------------------------------------------------------------------------------------------------#


#-- NOTA --------------------------------------------------------------------------------------------------#
#-- Descomentar los bloques que se quieran ejecutar y comentar el resto. ----------------------------------#
#----------------------------------------------------------------------------------------------------------#


#-- Variables para la función get_weather_data ------------------------------------------------------------#
'''
api_endpoint = "https://meteostat.p.rapidapi.com/point/hourly"
api_host = "meteostat.p.rapidapi.com"

columns = ["city", "datetime", "air_temperature", "dew_point", "relative_humidity", "precipitation", "snow_depth",
           "wind_direction", "avg_wind_speed", "peak_wind", "sea_level_pressure", "sunshine", "weather_condition_code"]

start_date = "2024-04-18"
end_date = "2024-04-23"

file_name = "weather_data.xlsx"

# Ejecución de la función get_weather_data
get_weather_data(cities_coordinates, api_key_1, api_endpoint, api_host, columns, start_date, end_date, file_name)
'''
#----------------------------------------------------------------------------------------------------------#


#-- Variables para la función get_air_quality_data --------------------------------------------------------#
'''
api_endpoint = "https://air-quality.p.rapidapi.com/history/airquality"
api_host = "air-quality.p.rapidapi.com"

columns = ["city", "air_quality_index", "co", "datetime", "no2", "o3", "particulate_matter_10", "particulate_matter_25", 
           "so2", "timestamp_local", "timestamp_utc", "unix_timestamp"]

file_name_1 = "air_quality.xlsx"
file_name_2 = "air_quality_2.xlsx"

lista_ciudades = list(cities_coordinates.items())

# Dividimos las ciudades debido al límite de llamadas a la API por cuenta gratuita
cities_coordinates_final_1 = dict(lista_ciudades[:20])
cities_coordinates_final_2 = dict(lista_ciudades[-13:])

# Ejecución de la función get_air_quality_data
get_air_quality_data(cities_coordinates_final_1, api_key_1, api_endpoint, api_host, columns)
get_air_quality_data(cities_coordinates_final_2, api_key_2, api_endpoint, api_host, columns)
'''
#----------------------------------------------------------------------------------------------------------#


#-- Atributos de la función get_koppen_climate_classification ---------------------------------------------#
'''
api_endpoint = "https://koppen-climate-classification.p.rapidapi.com/classification"
api_host = "koppen-climate-classification.p.rapidapi.com"

columns = ["city", "classification"]

file_name_1 = "koppen_classification.xlsx"
file_name_2 = "koppen_classification_2.xlsx"

lista_ciudades = list(cities_coordinates.items())

# Dividimos las ciudades debido al límite de llamadas a la API por cuenta gratuita
cities_coordinates_final_1 = dict(lista_ciudades[:18])
cities_coordinates_final_2 = dict(lista_ciudades[-15:])

# Ejecución de la función get_koppen_climate_classification
get_koppen_climate_classification(cities_coordinates_final_1, api_key_1, api_endpoint, api_host, columns)
get_koppen_climate_classification(cities_coordinates_final_2, api_key_2, api_endpoint, api_host, columns)
'''
#----------------------------------------------------------------------------------------------------------#


#-- Atributos de la función generate_all_csv_from_excel ---------------------------------------------------#
'''
folder_path = "data/data_files"
transform_all_excel_to_csv(folder_path)
'''
#----------------------------------------------------------------------------------------------------------#


#-- Atributos de la función generate_csv_from_excel -------------------------------------------------------#
'''
file_path = "data/data_files/city.xlsx"
transform_excel_to_csv(file_path)
'''
#----------------------------------------------------------------------------------------------------------#