'use strict';
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    //console.log(this);
    //console.log(event);
  
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
  
    clickedElement.classList.add('active');

    //console.log('clickedElement (with plus): ' + clickedElement);
  
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);
  
    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };
  

  //document.getElementById('test-button').addEventListener('click', function(){
  //   const links = document.querySelectorAll('.titles a');
  //  console.log('links:', links);
  // }); 

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleAuthorSelector = '.post-author';

    function generateTitleLinks(customSelector = ''){
  //console.log(customSelector);
  //console.log(optArticleSelector);
    /* remove contents of titleList */
 
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html ='';

    for(let article of articles){
    
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);
      /* create HTML of the link */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
  
      /* insert link into titleList */
      html = html + linkHTML;
      //console.log(html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  function generateTags(){
    
    const optArticleTagsSelector = '.post-tags .list';
    /* find all articles */
    const articles = document.querySelectorAll('article');
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        //console.log (linkHTML);
        /* add generated code to html variable */
        html = html +linkHTML+'';
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
    /* END LOOP: for every article: */
    } 
  }
    
  
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks){
      /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLinkHref of allTagLinksHref) {
      /* add class active */
      tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
   
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
    
  }
  
  addClickListenersToTags();


  function generateAuthors (){
    const articles = document.querySelectorAll('article');
    for(let article of articles){
      const authorWraper = article.querySelector(optArticleAuthorSelector);
      const author = article.getAttribute('data-author');
      //console.log(articleAuthor);
      const linkHTML = '<li><a href="#' + author + '">' + author + '</a></li>';
      authorWraper.innerHTML = linkHTML;
    }
    
  }
  generateAuthors ();
  
  function addClickListenersToAuthors(){
    const links = document.querySelectorAll('.post-author a');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#','');
    const activeLinks = document.querySelectorAll('a.active[href^="#-"]');
    for (let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    const allAuthorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLinkHref of allAuthorLinksHref) {
      authorLinkHref.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }
  // Nie jestem pewny rozwiązania i też nie rozumiem dlaczego po kliknięciu w tag lub autora czyści mi listę arykułów 
}