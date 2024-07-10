# Fine-tuning-with-Llama-2

## Generalitati

-   Am lucrat proiectul in Google Colab
-   Am folosit o varianta comprimata a modelul de limbaj (LLM) open-source Llama 2
-   Am folosit datele resursa din Datasets - in contul meu de HuggingFace, de unde au fost importate:

## Rularea proiectului

-   Deschide fisierul de jupyter notebook atasat
-   Ruleaza fiecare secventa de cod (sari peste secventa [10] ("# Empty VRAM"), ruleaz-o numai daca ai incercat repetate ori restul secventelor, si este necesara eliberarea de memorie)
-   In secventa [9] de cod ("# Run text generation pipeline with our next model"), variabila "prompt" primeste manual instructiunile de "user prompt", sau cerintele clientului.
-   Noul model antrenat il gasesti stocat si in link-ul de HuggingFace de mai jos:

## Dependintele proiectului

-   Dependintele necesare apar in fisierul meu de jupyter notebook; printre care sunt si: accelerate, peft, transformers, torch, datasets.

## Antrenarea/manipularea si rularea AI-ului

### Procesul parcurs de mine cuprinde:

-   Definirea cat mai clara a problemei si obiectivului - in cazul nostru se doreste elaborarea unui plan de development pentru o aplicatie web/mobile, tinand cont de cerintele clientului.

-   Este necesar un set de date accesibil (pregatite in formatul interpretabil de catre modelul (LLM) ales). Pentru gestionarea setului de date am folosit contul de HuggingFace (prin libraria "transformers" pentru Python, care furnizeaza API-uri ajutatoare in antrenarea modelelor).

-   Am folosit pentru antrenare setup-ul hardware disponibil in mediul de la google (prin google colab).

-   Am definit parametrii cum ar fi: learning rate, number of epochs.

-   Am selectat 14 din exemplele din arhiva pentru a forma setul de date pentru antrenare (cele 2 ramase le-am folosit pentru teste).

-   In cazul modelului elaborat de mine testarea se realizeaza manual, prin valorificarea variabilei "prompt".

-   In urma evaluarii incercarilor am observat ca sunt de ajutor:
    -   texte cat mai generale despre ce ne dorim sa obtinem ca rezultat;
    -   repetarile aceleiasi instructiuni, poate in alta forma/exprimare;
    -   folosirea termenilor radicali: "trebuie", "numai";
    -   ca variabila "prompt" (care primeste un string) sa contina de asemenea si o secventa de System promt (instructiuni generale, concise, poate repetate, si cu exprimari deloc sofisticate);
