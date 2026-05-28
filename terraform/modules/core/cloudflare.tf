data "cloudflare_zone" "arcade_lab" {
  filter = {
    name = "arcade-lab.io"
  }
}

resource "cloudflare_dns_record" "ses_verification" {
  zone_id = data.cloudflare_zone.arcade_lab.zone_id
  name    = "_amazonses.arcade-lab.io"
  type    = "TXT"
  content = aws_ses_domain_identity.arcade_lab.verification_token
  ttl     = 1
}

resource "cloudflare_dns_record" "ses_dkim" {
  count   = 3
  zone_id = data.cloudflare_zone.arcade_lab.zone_id
  name    = "${aws_ses_domain_dkim.arcade_lab.dkim_tokens[count.index]}._domainkey.arcade-lab.io"
  type    = "CNAME"
  content = "${aws_ses_domain_dkim.arcade_lab.dkim_tokens[count.index]}.dkim.amazonses.com"
  ttl     = 1
}
