# 🏗️ Building my home server: Part 2

_SMB with Samba_

📅 2025-10-03

As mentioned earlier, my original goal was to set up a file server within my local Wi-Fi network. After researching various solutions and libraries, I decided to use the Samba library, an open-source tool for implementing the SMB protocol on Linux. Initially, I explored SFTP, as it is widely regarded as one of the most secure options for file sharing. However, I ultimately didn’t feel the need to use SFTP because I didn’t want to make my system public; it was intended to be accessible only within my local network. Another factor in my decision was that SFTP requires a separate client, while SMB, on the other hand, seemed easier to set up and offered better performance. It doesn’t require any client software and is seamlessly integrated into Linux, Windows, and macOS. The final reason I chose SMB was that since version 3, SMB supports encryption in transit, adding a layer of security that aligned with my needs.

### 🛠️ Install & Configure

Installing [Samba](https://www.samba.org/) in a Linux environment is straightforward:
`sudo apt update && sudo apt install samba`. To configure the Samba service, you'll first need to stop the Samba Daemon process: `sudo systemctl smbd stop`. The `smbd` process is the central component responsible for file sharing, authentication, and authorization (including user management). It also listens for requests from clients (such as Linux, Windows, and macOS machines). Once you start Samba, the `smbd` process runs in the background. When a client attempts to access a shared folder on the server, it sends an SMB request. `smbd` processes the request, performs the necessary checks, and serves the requested data or resource.

To configure Samba, you need to modify the configuration file located at `/etc/samba/smb.conf`. It's a good practice to create a backup of your smb.conf configuration file before modifying it. You can do this by running the following command: `sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak` While there are some default settings already included, I chose to use my own custom configuration, which looks something like this:

```
# Global Settings
[global]
   server string =
   interfaces = lo eth0 192.168.64.0/24
   bind interfaces only = yes
   client min protocol = SMB3
   client max protocol = SMB3
   socket options = TCP_NODELAY SO_RCVBUF=8192 SO_SNDBUF=8192
   log level = 3
   log file = /var/log/samba/%I%t.log

# Shared folders
[shared_folder_1]
   path = /path/to/your/volume
   force user =
   force group =
   force create mode = 0664
   force directory mode = 0775
   guest ok = no
   public = no
   writable = yes
   valid users = @smbgroup
   hosts allow = 192.168.64.0/24
   strict locking = yes
```

### ⚙️ Global settings

In the global settings section of the configuration file, we define general parameters for the Samba server:

- **server string**: A description of the server, which can be displayed when browsing the network.
- **interfaces**: Specifies which network interfaces Samba should listen on. In this example, it listens on the loopback interface (lo), the Ethernet interface (eth0), and the subnet 192.168.64.0/24.
- **bind interfaces only**: Ensures that Samba only listens on the interfaces specified in the interfaces directive. This adds an extra layer of security by restricting Samba to certain network interfaces.
- `client min protocol` and `client max protocol`: These settings enforce the minimum and maximum SMB protocol versions that can be used by clients when connecting to the server. In this case, both are set to SMB3, ensuring that only SMBv3 connections are accepted, which is more secure than older versions like SMBv1.
- **socket options**: Tweaks the underlying network socket performance. TCP_NODELAY disables the Nagle algorithm for more responsive communication, while SO_RCVBUF and SO_SNDBUF set the receive and send buffer sizes to optimize network performance.
- **log level**: Defines the verbosity of the Samba logs. A value of 3 is typically for general troubleshooting, providing a balance of detail without being overwhelming.
- **log file**: Specifies the path to the Samba log files. %I and %t are placeholders for the client’s IP address and timestamp, respectively, which makes log management easier.

### 📁 Shared folder settings

In the shared folder settings section, we define the properties of each shared resource:

- **path**: Specifies the directory to be shared. Replace /path/to/your/volume with the actual directory path you wish to share.
- `force user` and `force group`: Ensures that all files within the shared folder are created and owned by a specific user and group. These can be left empty or set to a specific user/group as needed.
- **force create mode** and **force directory mode**: Define the permissions for files and directories created within the shared folder. Here, files will have a permission mode of 0664 (readable/writable by the owner and group, and readable by others), and directories will have 0775 (readable, writable, and executable by the owner and group, and readable and executable by others).
- **guest ok** and **public**: These settings control whether guest access is allowed. Setting both to no ensures that users must authenticate to access the shared folder.
- **writable**: Specifies that the folder is writable by clients. Setting this to yes allows clients to modify files in the shared directory.
- **valid users**: Limits access to the shared folder to a specific group of users. In this case, only users in the @smbgroup group will have access.
- **hosts allow**: Restricts access to the shared folder to specific IP addresses or subnets. Here, access is limited to the 192.168.64.0/24 subnet.
- **strict locking**: Enforces strict file locking to prevent multiple users from modifying the same file at the same time, ensuring data integrity.

For more configuration options, you can refer to the manual page for smb.conf [here](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html).

### 👥 User Management

For security and best practices, it's a good idea to create a separate user and user group for SMB access. So, I created the following:

```bash
sudo groupadd --system smbgroup
sudo useradd --system --no-create-home --group smbgroup -s /bin/false smbuser
```

- `--system`: This flag indicates that you’re creating a system user rather than a regular user. A system user is typically used for running services or system processes and generally doesn't have login capabilities or a home directory. System users often have lower user IDs (UIDs) to distinguish them from regular users.

- `--no-create-home`: This option tells the system not to create a home directory for the user. Normally, when you create a user, a home directory is created in `/home/username`. Since this is a system user for Samba, we don’t need a home directory.

- `--group smbgroup`: This flag assigns the new user (`smbuser`) to the existing group named `smbgroup`. If the group `smbgroup` doesn’t already exist, it will be created.

- `-s /bin/false`: This specifies the user’s login shell. By setting the shell to /bin/false, the user will not be able to log in interactively via the terminal. It essentially disables shell access, which is a common practice for system users that don’t need to log in to the system, like a Samba user.

In addition to creating the Linux user and group, the user also needs to be added to Samba:

```bash
sudo smbpasswd -a smbuser
```

Here are some useful commands to modify the password or delete a Samba user (not a Linux user) later:

```bash
# Modify password
sudo smbpasswd smbuser

# Delete Sambe user
sudo smbpasswd -x smbuser
```

I also access the files shared via SMB using a containerized [FileBrowser](https://filebrowser.org/). The directories need to be readable and writable by the user running inside that container. Since I prefered not to use the `smbuser` account there, I configured the `force user` and `force group` properties in Samba to ensure that files are read and written under that specific user's name running the FileBrowser container.

### 🚀 Restart and test

Now that everything is set—Samba is configured, the Linux user and group are created, and the user has been added to Samba—I just had to reload the service with the following command: `sudo service smbd restart`

To verify that everything is working correctly I checked the status of the Samba service using `systemctl`: `sudo systemctl status smbd`

To test the SMB connection, I tried to connect through a client. In my case, on macOS, I used `Finder → Go → Connect to Server...` using this URL format: `smb://<your ip>/<shared folder name from config>`.\
\
Noice! 🎉
