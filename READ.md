I want to build an ingredient stock checking pwa for my myanmar staff  . No overengineering .

Problem face : Everytime staff didn't check stock consistently and when they check , they didn't do it thoroughly because they don't have the stock check list to refer and proceed the task .So everytime we need to buy stock at different time because they will tell us 临时临急.

My idea : A pwa for my myanmar staff to install that comes with  Myanmar and English(Because i donno know how to read Myanmar ) to toggle . Once the Pwa is completed then we will fix this to only Myanmar and no english , unless I wanted to test the PWA then I will toggle on the English on coding .  

The Home page got separated into two div .
Work flow 🔻 
1. The top div is all ingredients stock listed for them to check and click which one need to be top up or insufficient . We can make the ingredients stock in forms of pill shape .
2.The bottom div is showing  ingredients they had clicked from the top div for them to see properly  with only one submit button at right bottom. After the clicked ingredient will disappear from the top div because it has moved to bottom div .
3. After they clicked the submit button , it will pop up the model to show the list that are insufficient and comes with 2 buttons with " confirm " and  "back" 
4. If they clicked the confirm button , the ingredients will send to 2 whatsapp number that is my number "018-780 6530 " and my brother's number " 012-853 3050 " . Must got time stamp function 
5. The ingredients send to our number must be in different language because my brother doesn't know how to read English and Myanmar . For me I doesn't know how to read Myanmar only .
So set the ingredients to be translated to English for my whatsapp number and Mandarin for my brother's whatsapp number .
6. Once confirm is submitted , make the page to stay the submited ingredients on the bottom div and locked the submit button , let it inactive until the next day then refresh the brand new page . Unless my staff click the top div ingredient. 

Frontend tech stack : React.js , Tailwind
Backend : I have no idea , so what is your idea.
Authentication : I got 3 workers , put different username and Password . So I can trace who submit the ingredients . The sender name should include into our whatsapp message . I think add 1 more authentication for me too , I as an admin login will automatically in English . My 3 workers if they log in , automatically will be in Myanmar .
If I fire one of the worker , i also must able to remove account at authentication database . So should we build postgresql ? easy for me to remove and add .Hmm what do you think ? 
Hosting and subdomain : As long as it is free . What is your idea and suggestion
css color must be consistent : background should be f1f1f1 , header : green , header-font : f1f1f1 , font-color : dark grey , button-color : green .must got shadow .What is your idea for UI/UX 
Must use fontawesome !

Discuss first , don't proceed yet !

-------------------------
Backend and hosting Options : 
Actually I was wondering whether to use PostgreSQL + Node.js + Express . I don't understand what do you meant by separate hosting ?

1. Option A should be better for Whatsapp Integration , which means i don't need staff to have authentication , since we will know which staff send the confirmation using their whatsapp link that send to our whatsapp link , right ? But could this function build to be send to my whatsapp and my brother's whatsapp at the same time ?

2. We got around 30 ingredients and stocks .For Myanmar staff , should we do ingredients's image with tap tap method on the top div , then the bottom div is listed without image but ingredient names in Myanmar language . At least got picture , easy for them to choose , right   ? But the problem is are we able to fit the column grid with 30 ingredients at mobile view. I think it is too much  too scroll if we wanted to do a quick check . How about we categorized the ingredients and stock into simple category tab 🔻 
Main : Tofu , Cabbage , Shiitake , egg , pickles , Sambal , Sauce ,Rice
Packaging : take away container with 3 compartments , round container , plastic bag , spoon , sambal container
Others : White Wine , Black Wine , Oil , Dark Sauce (For this category change to pill form because my brother don't want them to reveal this category of the images )

oh ya , the bottom div should add note box if ingredients are not listed on the top div .

As an admin , If I wanted to  add/edit/remove ingredients from a
  dashboard , I will make these changes directly on coding since I can handle the coding . Actually I was wondering whether it is necessary to get authentication because it is just a tool that send insufficient stock from whatsapp to whatsapp . I build this tool is to make them easy , they don't have to type words on whatsapp . What they need to do is check every single stocks and ingredients , if insufficient then just do tap tap method , very easy for then and save time too .

  3. Daily Reset at 12.00am Malaysia time because here is Malaysia . They are allow to submit ingredients that are available on top div . Once they click the stock from top div , it will immediately disappear from the top div and the stock name will appear on bottom div . It easy for them to check again on top div with less images . For the bottom div , if they not yet clicked the submit button means they able to delete the items at bottom div . But once submit button click, they are not allowed to edit the items at bottom div unless there's a new addition from top div send to bottom div .

4. I don't have Myanmar translation .

5. What do you think of UI/UX because got changes based on my requirement .

6. No need for admin features because I can do changes on coding 

--------------

1. I prefer the Whatsapp group option with Chinese language . We don't need the English Language anymore, since I can read Chinese . If create the group , what should I put , and should I also invite them to join the group ?

2. I think simple authentication that can keep them log in with different username , so should i still using PostgreSql for this authentication ? What do you think ?

3. We do manual Json file since it needs to be automatically translate into chinese in order to send via whatsapp , right ? What do you think ? Don't forget we also need to toggle to English for the home page , easy for me to read . Better we do 3 language [Myanmar , English , Mandarin]. Use tap tap icon to toggle language , so the icon got Myanmar Flag , EN icon and CN icon .

4. I am still thinking which part we need the postgreSQL ? I don't know whether it is important to use postgreSQL for my stock check tool or not ? What do you think ? I was wondering what tech stack should use for backend ? Actually we don't need the timestamp anymore because once the orders submited to Whatsapp group then it will got timestamp from whatsapp . And I don't think we need the submissions history because all the history will be shown on whatsapp group , right ? i feel like it is not necessary to build a database . Hmm what do you think ? 

5. For the UI/UX on header , Stock Check Tool is on left side then language toggle icon and Logout icon is on right side .
For the top div , could we do 4 rows of 2 for images  ? Stock 's name is not necessary to appear on top div . 

------------------

1. The logging in needs time to login , could you make the loading to be animated while staff waiting time to login the page .
2.  Our grid is 4 columns , right ? Could we make it to 3 columns so the grid box will look bigger and the image will become bigger to see . What do you think ?
3. I think we can remove the install icon button but don't remove the functionality of promptbeforeinstall . The icon only appear when detected this app is not installed . Once installed , the icon should be disappear instantly . What do you think ?
4. For the time polling , can set to 5 seconds or not ?
5. For the refreshed button can set to automatic or not , so we don't need the refreshed button at all . Can make it automatically refreshed or not . What do you think ?
6. I want to add a div section in between of "SELECT ITEMS" div section and " ITEMS TO RESTOCK" div section  , that is check stock quantity. This section is for them to key in  the morning and after dismiss so we can let staff to key in the quantity , easy for us to track the quantity of Braised Pork's packets and Kong Bak's packets .🔻 
Braised Pork :
Kong Bak :
What do you think  ?
7. If we want to deploy manually on git bash , what's the steps ?

Let's discuss first , don't fix yet .