import numpy as np
import pandas as pd 
import nltk  
nltk.download('stopwords') 
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer 
import re  
from flask import Flask, request, jsonify, json, render_template
import joblib
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)
model = joblib.load('my_review_classifier_model.pkl')
vectorizer = joblib.load('countvectorizer.pkl')


def classifyReview(review):
  review = review
  review = re.sub('[^a-zA-Z]', ' ', review)
  review = review.lower()
  review = review.split()
  ps = PorterStemmer()
  all_stopwords = stopwords.words('english')
  all_stopwords.remove('not')
  review = [ps.stem(word) for word in review if not word in  set(all_stopwords)]
  review = ' '.join(review)
  new_corpus = [review]
  new_X_test = vectorizer.transform(new_corpus).toarray()
  new_y_pred = model.predict(new_X_test)
  return new_y_pred

@app.route('/predict',methods=['POST'])
def predict():

    review = request.get_json()['review']
    prediction = classifyReview(review)
    if prediction[0]==1:
        good_review=1
        return jsonify(good_review)
    else :
        good_review=0
        return jsonify(good_review)
    # return json.dump(prediction)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
