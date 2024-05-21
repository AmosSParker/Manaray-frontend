# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default Nginx contents.
COPY ./dist/manaray-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
