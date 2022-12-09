FROM python:3.8

ENV APP_HOME /app

WORKDIR $APP_HOME

COPY . ./

RUN pip3 install --no-cache-dir -r  requirements.txt

RUN pip3 uninstall neuralcoref

RUN pip3 install neuralcoref --no-binary neuralcoref

RUN pip3 install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.2.0/en_core_web_sm-2.2.0.tar.gz#egg=en_core_web_sm

RUN python3 -m spacy download en

CMD exec gunicorn --bind :$PORT --workers 1 --worker-class uvicorn.workers.UvicornWorker  --threads 8 app.app:app