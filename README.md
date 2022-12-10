# int_Elligent_chatbot
Retrieval based multi topic chatbot

# Chatbot overview
○ Our chatbot is based on a retrieval system that responds to user queries
about a variety of cogent topics by using data scraped from Reddit. The
application also supports open domain conversations with the user.
○ We define explicit rules for retrieving and ranking the relevant
responses from indexed data and perform post processing on the
selected results to present personalized responses.
○ We are using elastic search to index and query the Reddit data. The
front end uses React.js and Chart.js and the backend is built using
Python. The entire application is hosted on the Google Cloud Platform.

# Dataset and API
○ We used 3 data sources for our project
■ Reddit
■ Wikipedia
■ Chitchat/Greetings
○ Reddit Dataset
■ Reddit data was scraped using the Pushshift API
(https://github.com/pushshift/api).
■ We maintain a submission-comment and comment-comment
relationship in the data.
○ WikiQA Dataset
■ WikiQA corpus is a publicly available set of question and
sentence pairs, used for open-domain question answering. The
corpus includes 3,047 questions and 29,258 sentences, where
1,473 sentences were labeled as answer sentences to their
related questions.
○ Chitchat/Greetings Dataset
  ■ The greeting dataset is a collection of chitchat and a common
collection of greeting queries that are indexed together for
short dialogues between the user and our chatbot.
  ■ We cleaned and converted the chitchat dataset to a
question-and-answer format for better query and response
retrieval.


# Reddit data collection
○ We scraped data for 5 topics listed below using custom keywords from
multiple subreddits. We limit submissions that have more than 20
comments, to select only high-engagement posts.
○ Examples of keywords used:
  ■ Healthcare: covid, vaccines, drugs, hospitals, etc
  ■ Education: authors, textbooks, novels, universities, etc
  ■ Politics: trump, Biden, laws, election, etc
  ■ Environment: water, oxygen, pollution, conservation, etc
  ■ Technology: Apple, internet, google, phones, etc
○ Along with topic-specific data we also included data from famous
subreddits like
  ■ ExplainLikeImFive
  ■ FoodForThought
  ■ ChangeMyView
  ■ TodayILearned


# Data preprocessing
○ Remove entries which have more than 5 sentences in the selftext.
○ Remove entries with more than 100 tokens
○ Remove entries with only URL/links in the selftext or title
○ Parts of speech tagging (spacy, See: https://spacy.io/ )
○ Entity extraction

# Data Indexing
○ The data is indexed into ElasticSearch using bulk. We index multiple
datasets in JSON files using bulk API requests.
○ What is elastic search?
■ Elasticsearch is a distributed, open-source search and analytics
engine for all types of data, including textual, numerical,
geospatial, structured, and unstructured. It is built on top of the
Apache Lucene search engine library. It is used for full-text
search, structured search, analytics, and all three in
combination. It is designed to scale to very large datasets and
can be used for a variety of use cases such as log analytics,
real-time application monitoring, and clickstream analytics.
■ See: https://www.elastic.co/what-is/elasticsearch


# Input Query
○ Query preprocessing
  ■ Spelling check
  ■ Entity extraction
  
  
# Document Retrieval
○ We are using ElasticSearch python package to query our indexes and
get to results
○ We query all the cores and re-rank the compiled responses.
○ Then we perform an embedding-based similarity check on them using
Spacy and select the most relevant result.


# Response Selection
○ Select Top 10 from ElasticSearch Reddit data
○ Top 5 from WikiQA data
○ Top 1 relevant from Chitchat/Greetings data


# Document similarity
○ We perform doc-query similarity using Spacy’s pre-trained model
○ Spacy is a free, open-source library for advanced Natural Language
Processing (NLP) in Python. It features pre-trained statistical models
and word vectors and includes tools for tokenization, part-of-speech
tagging, dependency parsing, and entity recognition. Spacy is
designed to help developers build software that can understand
written language, and is used by many leading companies and
research institutions. (See: https://spacy.io/ )
○ We then rank the results and select the doc with the highest similarity
score.


# Context management
○ We are using Spacy with Neuralcoref / Allennlp models coreference
resolution feature to build context in incoming queries using the past
queries.
○ We alternate between the coref libraries as they have different build
dependencies in local and GCP.
○ In GCP we are using Spacy with Neuralcoref.
○ Incoming queries should be well formed to retain context, like the
below example. A simple “Why ?” to get context from the previous
query would be confusing and would not return good results.

# Response Processing
○ After selecting the most relevant result we perform the below steps
before we present the response to the user
  ■ Special characters removal
  ■ case folding
  ■ Adding punctuations
  ■ Extracting entities
● Analytics and Visualizations
○ We use Chart.js to present dynamic and interactive analytics from our
chatbot.
○ We present:
■ A bar chart for cumulative topic counts for most queried topics.
■ A line chart for the similarity score for the most queried dataset.
■ A pie chart to show the distribution of keywords searched.
■ A topic-specific word cloud for common keywords.


# App Deployment
○ The application backend is dockerized and deployed on GCP

## Landing Page
![This is an image](https://github.com/abhinine4/int_Elligent_chatbot/blob/main/images/Screenshot%202022-12-04%20at%208.10.54%20PM.png)

##Cross Topic chats
![This is an image](https://github.com/abhinine4/int_Elligent_chatbot/blob/main/images/Screenshot%202022-12-04%20at%208.16.40%20PM.png)

## Analytics
![This is an image](https://github.com/abhinine4/int_Elligent_chatbot/blob/main/images/Screenshot%202022-12-04%20at%208.17.32%20PM.png)
