# CineList
---
## O que ele faz

É um site para ver os filmes que estão em cartaz no momento e os que estão para serem lançados. Atraés dele podem ser feitas pesquisas por demais filmes para ter acesso a mais detalhes, como o lancçamento, elenco, receita, etc. A partida paǵina de detalhes poode-se navegar para informações sobre os artistas envolvidos, a adição dos filmes em uma lista de favoritos e e pesquisa do trailer do filme no YouTube.

---
## Como faz
O site é escrito com o framework React JS em TypeScript.
A base de dados é a biblioteca do TMDB, com comunicação através de sua API e axios.
O salvamento das listas é feito em cache com o Local Storage.

---
## Como rodar o programa
* Primeiro clone o repositório para a sua máquina com `https://github.com/dhidon/CineList.git`
* Instale as dependências necessárias com `npm install`
* Essa aplicação precisa de uma chave ativa e configurada do [TMBD](https://developer.themoviedb.org/docs/getting-started) no diretório:
```
root
   |- src/
   	|-services/
   		|-api.js
```
* Agora é só rodar o site com `npm run dev`

---
## Screenshots#
<img width="1904" height="945" alt="Captura de imagem_20260128_131402" src="https://github.com/user-attachments/assets/5ad28de2-6c48-4ddd-8095-326b0658ea91" />
<img width="1920" height="943" alt="Captura de imagem_20260128_131533" src="https://github.com/user-attachments/assets/7342a3f3-9565-47c7-8f8c-d9b21a1266ae" />
<img width="1906" height="949" alt="Captura de imagem_20260128_131444" src="https://github.com/user-attachments/assets/2ca655b0-138f-4451-bf71-1c6341fe457d" />
<img width="1905" height="950" alt="Captura de imagem_20260128_131425" src="https://github.com/user-attachments/assets/31c83746-b3ef-4eee-997d-710a465e739f" />
<img width="1920" height="944" alt="Captura de imagem_20260128_131517" src="https://github.com/user-attachments/assets/dd15599c-78aa-40e4-8896-0c07664a66ab" />
