ng build --environment=prod --base-href /smartsale/dist/  --target=production
scp -r dist cache.cav.local:/cav/tomcat7/webapps/smartsale/
scp signin.css index.jsp cache.cav.local:/cav/tomcat7/webapps/smartsale/