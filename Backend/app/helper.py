#!/usr/bin/env python
# coding: utf-8
from autocorrect import Speller
import re
import en_core_web_sm
nlp = en_core_web_sm.load()

# Check retrueved doc and query similarity score and get most similar doc
def checkSimilarityScore(relevant_docs: list, query_doc):
    m = 0
    most_similar_doc = ""
    # boost_words_string = nlp(u'%s' % ' '.join(boost_words))
    for doc in relevant_docs:
        doc = nlp(u'%s' % doc)
        sim = query_doc.similarity(doc)
        if sim > m:
            m = sim
            most_similar_doc = doc

    return str(most_similar_doc), m


# Spelling correction
def correct_sentence_spelling(sentence):
    spell = Speller()
    correct = spell(sentence)
    return correct


def format_text(answer):
    text = answer
    text = re.sub('\n', '', text)
    text = re.sub('&gt', '', text)
    text = re.sub(r'\;', '', text)
    text = re.sub(r'\"', '', text)
    formatText = [ i.strip().capitalize() for i in text.split('.')]
    formatText = '. '.join(formatText)
    formatText = formatText.strip()
    formatText = formatText + '.' if formatText[-1] != '.' else formatText
    return formatText

def keywords(query_doc):
    # Extrating parts of speeches from query
    pos_lst = ['NOUN', 'PROPN']
    boost_words = []
    for token in query_doc:
        if token.pos_ in pos_lst:
            boost_words.append(token.text)
    return boost_words

def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
