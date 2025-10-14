# 🏗️ Building my home server: Part 1

_Starting and connecting to the server_

📅 2025-10-03

I recently decided to build my own server for sharing files across my local network. Initially, my goal was simply to create a central hub for my movies, photos, and files. However, as the project evolved, I found myself expanding beyond that original scope. I aimed to create a straightforward, well-organized system, all while prioritizing security best practices. Throughout the process, I gained valuable experience with various tools and systems, including Linux, SSH, SMB, volumes, user management, firewalls, Nginx, backup strategies, and Ansible automation. This series of posts is about my journey of building the server, the discoveries I made along the way, and how I adapted after learning from my mistakes.

## 💾 Server OS

My intention was also to learn about Linux. I worked with it before a lot especially in containerized environments, however, I was thinking that this would be a perfect opportunity to refresh my knowledge and to get hands-on experience. So, I decided to do it hardcore: I decided to work with [Ubuntu Server](https://ubuntu.com/download/server), which is basically a headless Linux. Having only the CLI to interact with the system forced me to interact with the system entirely through Linux commands, which made me realize how much I had forgotten about basic Linux commands. All in all, it turned out to be a great decision, as I ended up learning a lot.

## 🌎 Connect to the Wi-Fi

My first challenge was figuring out how to connect my server to the Wi-Fi network, enabling me to manage it via SSH. I used [this](https://linuxconfig.org/ubuntu-20-04-connect-to-wifi-from-command-line) guide to configure the Wi-Fi connection.

First, I needed to identify my system’s network interface. I ran one of the following commands: `ls /sys/class/net` or `ip a`. According to the guide linked above, the Wi-Fi interface typically starts with a _w_. In my case, it was `wlo1`.

After that, I edited the Netplan configuration file with the following command: `sudo vi /etc/netplan/50-cloud-init.yaml`. Then, I modified the configuration as follows:

```yaml
network:
  version: 2
  wifis:
    wlo1:
      dhcp4: true
      access-points:
        "<ssid>":
          auth:
            key-management: "psk"
            password: <password>
```

- `version: 2`: This specifies the version of the configuration format. Version 2 is the most recent and is used for newer Netplan versions (from Ubuntu 17.10 and later).
- `dhcp4: true`: This tells the system to use DHCP (Dynamic Host Configuration Protocol) to automatically obtain an IPv4 address from the router or network. Essentially, the system will request an IP address from the router when it connects to the Wi-Fi network.
- `key-management: "psk"`: This specifies the type of authentication to use. "psk" stands for Pre-Shared Key, which is the most common form of Wi-Fi authentication (the password you use to connect to the network).

Finally, I applied my new Netplan configuration by running `sudo netplan apply`. To verify that my server was successfully connected to the network, I ran: `ip a`.

So far so good.

## 💡 Setup SSH

To set up an SSH tunnel and access my server from my laptop, the first step was to launch an OpenSSH server. I followed [this](https://hostman.com/tutorials/how-to-install-and-configure-ssh-on-ubuntu-22-04/) guide to achieve that.

1. Update system and the packages:

```
sudo apt update && sudo apt upgrade
```

2. Install OpenSSH:

```
sudo apt install openssh-server
```

3. Start and enable SSH service:

```
sudo systemctl enable --now ssh
```

## 🧑🏻‍💻 Connect through SSH

At this point, I could have connected to the server using my username and password with the following command: `ssh username@server-ip`. However, for better security, it’s recommended to use an RSA key instead. So, I generated an RSA key pair by running the following command: `ssh-keygen -t rsa -b 4096 -C "some comment, e.g. email" -f ~/.ssh/id_rsa_home_server`.

After this I copied the public key to the server:`ssh-copy-id -i ~/.ssh/id_rsa_home_server.pub username@server_ip`

## 🛡️ Hardening security

To enhance SSH security, I needed to modify the SSH configuration file located at `/etc/ssh/sshd_config`. While the file already contains the default settings, I made the following adjustments to improve security:

- `Port`: Changed from the default port 22 to a custom port for enhanced security.
- `PubkeyAuthentication`: Set to yes to enable more secure authentication using SSH keys.
- `PasswordAuthentication`: Set to no to disable password-based authentication, allowing only pubkey authentication.
- `PermitRootLogin`: Set to no to prevent logging in directly as the root user.
- `PermitEmptyPasswords`: Set to no to prevent users from logging in with empty passwords.
- `MaxAuthTries`: Set to 6 to limit the number of unsuccessful authentication attempts within a single session.
- `MaxSessions`: Set to 10 to limit the number of concurrent sessions per user.
- `AllowUsers` and `AllowGroups`: Specifies the users and groups allowed to access the server.
- `LoginGraceTime`: Set to 30s to allow a 30-second window for successful authentication before disconnecting.
- `ClientAliveCountMax`: Set to 3 to limit the number of missed keep-alive messages before disconnecting the client.
- `ClientAliveInterval`: Set to 300 seconds (5 minutes) to define the inactivity timeout after which the user is disconnected.

I also configured UFW to allow SSH traffic. UFW stands for Uncomplicated Firewall, which is a frontend for managing iptables (the Linux firewall).

```
sudo ufw enable && sudo ufw allow <custom SSH port> && sudo ufw status
```

To apply changes I ran the following commands:

```
systemctl daemon-reload
systemctl restart ssh.socket
```

Finally, I was able to connect to my server from my laptop by running the command below! 🎉

```
ssh -p <custom port> username@server-ip
```
