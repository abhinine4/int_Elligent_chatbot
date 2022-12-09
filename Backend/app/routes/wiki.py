import wikipedia
import en_core_web_sm
nlp = en_core_web_sm.load()

def process_text(text):
    doc = nlp(text.lower())
    result = []
    for token in doc:
        if token.text in nlp.Defaults.stop_words:
            continue
        if token.is_punct:
            continue
        if token.lemma_ == '-PRON-':
            continue
        result.append(token.lemma_)
    return " ".join(result)

def get_relevant_docs(query):
    try:
        summary = wikipedia.summary(query)
        return summary.split(". ")[:5]
    except:
        return []
