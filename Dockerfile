# Use the official Apache HTTP Server image as base
FROM httpd:2.4

# Copy all project files into Apache's default public foldere
COPY . /usr/local/apache2/htdocs/

EXPOSE 80
