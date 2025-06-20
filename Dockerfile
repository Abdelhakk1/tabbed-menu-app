# Use official Apache image
FROM httpd:2.4

# Copy all website files into Apache’s root folder
COPY . /usr/local/apache2/htdocs/

EXPOSE 80