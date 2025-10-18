# 🏗️ Building my home server: Part 3

_Volumes and backup_

📅 2025-10-11

In my previous post, I discussed setting up my SMB server using the Samba library. In this post, I'll be focusing on managing volumes in Linux. Although I've worked with volumes in Linux environments before, setting everything up from scratch was a valuable experience that helped refresh my knowledge. I already had several hard drives containing movies, documents, and photos. Some of these needed to be migrated to another drive, while others had to be moved to a new partition I created on an existing drive. During the process of moving files, I quickly realized the importance of backups, which led me to implement an automated backup solution for my most important data. In this blog post, I'll share my approach and the lessons I learned along the way.

## ✏️ Planning

Originally, all my movies and photos were stored on a 1TB HDD, while my documents were kept on a flash drive. I also recently bought a brand-new 5TB HDD. My plan was to repartition the 1TB HDD: I intended to allocate 100GB for my documents (which were currently on the flash drive), while the rest of the drive would be dedicated to my photos. I planned to move all the movies from the 1TB HDD to the 5TB drive. During this process, I realized it would be useful to create a backup partition on the 5TB disk, allowing me to back up my photos daily and maintain a maximum of three backups at any given time.

Here's the task list I put together:

1. Partition and then format the new 5TB disk: Allocate 100GB for photo backups and the remaining space for movies.
1. Backup the photo data.
1. Repair the file system on the 1TB disk.
1. Copy the movies from the 1TB disk to the 5TB disk permanently.
1. Temporarily copy the photos from the 1TB disk to the 5TB disk. This was necessary as I needed to format the 1TB disk, which was using the NTFS file system. I planned to change it to ext4.
1. Partition and format the 1TB disk: Allocate 100GB for documents, with the remaining space dedicated to photos.
1. Copy the photos from the 5TB disk back to the 1TB disk. Move them to the appropriate partition.
1. Backup the documents.
1. Repair the file system on the flash drive.
1. Copy the documents from the flash drive to the 1TB disk. Place them in the correct partition. Remove the backup.
1. Set up an automated backup job for photos. Ensure regular backups are done for the photos on the 1TB disk. Target the 100GB partition on the 5TB drive.

## 🚀 Execution

To execute my plan, I utilized several Linux tools:

- `lsblk` to display my block devices
- `fdisk` for partitioning
- `rsync` for file backup
- `fsck` to fix any file system issues
- `mkfs` to format the file system

### Partitioning and Formatting

First, I had to partition and format my new 5TB drive. For partitioning, I used the `fdisk` tool.

```bash
# Unmount target disk
sudo umount /dev/target_disk

# If the disk has multiple partitions, unmount them all
sudo umount /dev/target_disk*

# Start fdisk
sudo fdisk /dev/target_disk
```

This opened an interactive prompt where I could create, delete, and modify partitions. Below are the commands I use most frequently, but generally, I just followed the prompt's instructions.

- `m` → Display help (list available commands)
- `p` → Print the current partition table
- `n` → Create a new partition
- `d` → Delete a partition
- `w` → Write the changes to disk and exit
- `q` → Quit without saving changes

It's worth mentioning that you can't make irreversible mistakes—if you don't write the changes, your disk won't be affected.

Once I partitioned the drive, I could format it with a specific filesystem (e.g., `ext4`, `ntfs`, `xfs`, etc.). The most common filesystem for Linux is `ext4`.

```bash
sudo mkfs.ext4 /dev/target_disk
```

Just in case, I checked and verified the filesystem type and details after formatting using `lsblk`.

```bash
lsblk -f
```

### Backing Up Data

Although I had a large amount of movie data (around 1TB), I deemed it non-critical, so I decided to skip backing it up. On the other hand, I considered my photos more valuable, so, I backed them up to the 5TB drive.

```bash
# List block devices and their partitions
lsblk

# Backup data
sudo rsync -aAXHvS --progress /mnt/source_disk/ /mnt/target_disk/
```

`rsync` is a powerful tool that can efficiently back up and synchronize files and directories. While its primary function is file copying, its advanced features and optimizations make it the go-to tool for tasks like backup, synchronization, and file transfer. It's ideal when you want efficiency and flexibility, especially for large datasets or remote backups.

- `-a` → archive (recursive + preserves metadata)
- `-A` → preserve ACLs
- `-X` → preserve extended attributes
- `-H` → preserve hard links
- `-v` → verbose
- `-S` → turn sequences of nulls into sparse blocks
- `--progress` → shows live progress

### Repairing the File System

Once the backup was complete, I could proceed to repair the filesystem using `fsck`. First, I unmounted the target device and ensured that it is not being used by any processes.

```bash
# Unmount your device
sudo umount /dev/target_disk

# Check and repair
sudo fsck /dev/target_disk
```

### Copying Files Between Drives

For copying files from one drive to another, I continued using `rsync` in the same way I did for the backup. The rest of the steps were pretty much the same, just with different source and target values.

### Automated backups

To automate the backup process, I wrote a custom bash script. In this version, I assigned Ansible variables to the SOURCE, BACKUP_BASE, and BACKUP_DIR variables, as I implemented the script with Ansible. You can easily replace these values as needed.

```bash
#!/bin/bash

# Photo backup script with rotation
# Backs up {{ backup_source }} to {{ backup_destination }}/photos_<timestamp>
# Keeps only the last 3 backups

set -euo pipefail

SOURCE="{{ backup_source }}"
BACKUP_BASE="{{ backup_destination }}"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_DIR="${BACKUP_BASE}/photos_${TIMESTAMP}"
LOG_FILE="/var/log/backup-photos.log"

# Function to log messages
log_message() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Check if source directory exists
if [[ ! -d "$SOURCE" ]]; then
  log_message "ERROR: Source directory $SOURCE does not exist"
  exit 1
fi

# Check if backup base directory exists
if [[ ! -d "$BACKUP_BASE" ]]; then
  log_message "ERROR: Backup base directory $BACKUP_BASE does not exist"
  exit 1
fi

log_message "Starting backup of $SOURCE to $BACKUP_DIR"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Make sure that the backup directory is owned by the ansible_user
chown {{ ansible_user }}:{{ ansible_user }} $BACKUP_DIR

# Perform backup using rsync
if rsync -aAXHvS "$SOURCE/" "$BACKUP_DIR/"; then
  log_message "Backup completed successfully to $BACKUP_DIR"
else
  log_message "ERROR: Backup failed"
  # Clean up failed backup directory
  rm -rf "$BACKUP_DIR"
  exit 1
fi

# Rotation: Keep only the last 3 backups
log_message "Starting backup rotation (keeping last 3 backups)"

# Find all photo backup directories and sort by modification time (newest first)
# Then skip the first 3 (keep them) and delete the rest
find "$BACKUP_BASE" -maxdepth 1 -type d -name "photos_*" | \
  sort -nr | \
  tail -n +4 | \
  while IFS= read -r old_backup; do
      if [[ -n "$old_backup" && "$old_backup" != "$BACKUP_BASE" ]]; then
          log_message "Removing old backup: $old_backup"
          rm -rf "$old_backup"
      fi
  done

log_message "Backup rotation completed"

# Show current backups
log_message "Current backups:"
find "$BACKUP_BASE" -maxdepth 1 -type d -name "photos_*" -printf '%TY-%Tm-%Td %TH:%TM:%TS %p\n' | sort -r | tee -a "$LOG_FILE"

log_message "Backup process finished successfully"
```

#### Script Breakdown:

I wrote the script above for an Ansible playbook, so it includes some Ansible variables. You can easily replace these values as needed. It's important to make the script executable by runnning: `sudo chmod 0755 /path/to/my/script`.

- `set -euo pipefail`:
  - Stops immediately when an error occurs (thanks to `-e`).
  - This option causes the script to exit if it tries to use a variable that hasn't been set (i.e., is unset or undefined) (thanks to `-u`).
  - With this option, the script will return the exit status of the last command in a pipeline that failed, rather than just the status of the last command (thanks to `-o pipefail`).
- The script begins by initializing the backup directories and setting the appropriate permissions.
- It then uses `rsync` to copy the files from the source directory to the backup directory, applying the same settings as before.
- After the backup is completed, the script collects all existing backup directories, sorts them by modification time in descending order, and deletes the oldest backups, keeping only the three most recent ones.
- The entire backup process is logged, including any errors or success messages, either to a file or to the terminal.

To run this script automatically on my Ubuntu Server, I used the `crontab` utility by running `sudo crontab -e` (which edits the `crontab` settings for the `root` user). `crontab` is a tool that allows you to schedule tasks to run at specified intervals. It's part of the cron system, a time-based job scheduler in Unix-like operating systems. After opening the `crontab` configuration file, I added the following line to schedule the script:

```bash
0 1 * * * /path/to/my/script >> /var/log/backup-photos.log 2>&1
```

The above configuration ensures that the script runs every day at 1 AM (according to server's local time). It also redirects both the standard output and error messages to the specified log file (`/var/log/backup-photos.log`).

With this additional step, I can relax knowing that my most important data is backed up automatically every day 😎

### Mount disks on system boot

Finally, to ensure that my disks are automatically mounted on system boot, I first needed to obtain the UUIDs of the devices. I did this by running: `lsblk -o UUID,NAME,FSTYPE,MOUNTPOINT`. Once I had the UUIDs of the target drives, I modified the filesystem table by running: `sudo vi /etc/fstab`. In the file, I added the following entry for each drive I wanted to mount automatically: `UUID=<uuid> <pathtomount> <filesystem> defaults,noatime 0 2`.

Here's a breakdown of what this line does:

- The partition with the specified UUID will be mounted at the target path, e.g., `/mnt/data`.
  This means the partition identified by the UUID will be automatically mounted to the directory `/mnt/data`.
- The filesystem type (e.g., `ext4`).
  This specifies the type of filesystem the partition is using, such as `ext4`, `xfs`, `ntfs`, etc.
- The filesystem will be mounted with default options and the `noatime` option:
  - `defaults`: This refers to a standard set of mount options that include read/write access, asynchronous I/O, and others that make the filesystem behave in a standard way.
  - `noatime`: This option prevents the system from updating the "access time" (atime) every time a file is read. This reduces unnecessary disk writes, which can improve performance, especially on SSDs.
- `0` → This value indicates that the partition will not be backed up by the dump utility. In practice, most filesystems do not require backups using dump, so 0 is commonly used here.
- `1` → This is the `fsck` order. It specifies the order in which the filesystems should be checked by the `fsck` (file system check) utility during boot:
  - `1` means this filesystem will be checked first (typically used for the root filesystem).
  - `2` means it will be checked second, and so on.
  - If set to `0`, the filesystem will not be checked during boot.

With the configuration above, if everything is set up correctly, all registered drives will now be automatically mounted to their specified mount points during system boot. 🎉🎉🎉
